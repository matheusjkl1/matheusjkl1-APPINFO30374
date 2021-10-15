import React, { useEffect, useState } from 'react';
import { api } from './service/fetch';
import Button from '@material-ui/core/Button';
import { TextField, Alert, FormControl } from '@material-ui/core';
import './App.css';

function App() {

  const [response, setResponse] = useState([])
  const [formState, setFormState] = useState({
    firstName: '', phoneNumber: '', birthDate: '',
  });
  const [requiredText, setRequiredText] = useState({
    firstName: '', phoneNumber: ''
  })
  const [sendResponse, setSendResponse] = useState('')

  useEffect(() => {
    api.get('/')
     .then((res) => setResponse(res.data))
     .catch((err) => console.error(err))
  }, [])

  const handleChange = (e) => {
    validateField()
    e.preventDefault();
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    if(!value) {
      setRequiredText({
        ...requiredText,
        [name]: <Alert severity="error">Campo Obrigatorio!</Alert>
      })
    } else {
      setRequiredText({
        ...requiredText,
        [name]: ''
      })
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (validateField()) {
      api.post('/', formState, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
          setSendResponse(
            <Alert severity="success">Dados enviados com sucesso!</Alert>
          )
          setTimeout(() => {  setSendResponse('')  }, 3000);
        }
      })
    }
  }

  function validateField() {
    const regex = /^[A-Za-z ]+$/.test(formState.firstName);
    const testPhone = /^\d{10,}$/.test(formState.phoneNumber.trim());
    if (!regex) {
      setRequiredText({
        ...requiredText,
        firstName: <Alert severity="error">Campo Obrigatorio!</Alert>
      })
    } 
    if (!testPhone) {
      setRequiredText({
        ...requiredText,
        phoneNumber: <Alert severity="error">Campo Obrigatorio!</Alert>
      })
    }
    if (!regex & !testPhone) {
      setRequiredText({
        ...requiredText,
        firstName: <Alert severity="error">Campo Obrigatorio!</Alert>,
        phoneNumber: <Alert severity="error">Campo Obrigatorio!</Alert>
      })
    }
    if (regex && testPhone) return true
  }

  return (
    <div className="App">
        { response.map(({ key, label, required, type: typeForm}) => {
          return (
              <form key={key}>
                  {typeForm === 'submit' ? (
                    <div className="button-submit">
                      <label htmlFor={label}>
                        <Button
                          sx={{ padding:2 }}
                          variant="contained"
                          color="primary"
                          required={required}
                          type={typeForm}
                          name={key}
                          onClick={sendData}
                        >
                          Enviar
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        sx={{ margin:2 }}
                        id="outlined-required"
                        label={label}
                        variant="outlined"
                        type={typeForm}
                        name={key}
                        onChange={handleChange}
                        helperText={required && sendData[key] !== "" ? requiredText[key] : " "}
                        className="input-field"
                      />
                    </FormControl>
                  )
                  }
              </form>
          )
        })}
      {sendResponse}
    </div>
  );
}

export default App;

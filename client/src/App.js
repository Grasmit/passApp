import './App.css';
import { useState } from 'react'


function App() {

  const [pass, setPass] = useState('initial')
  const [checkResult, setCheckResult] = useState({ score: null, info: null })
  const [range, setRange] = useState(50)
  const [resultedPassword, setResultedPassword] = useState(null)

  async function getPass(e) {
    e.preventDefault()
    console.log('get password submit button clicked')

    const url = process.env.REACT_APP_BASE_API + "/api/getpass"
    console.log(process.env.REACT_APP_BASE_API, url)

    const data = {
      "length": range
    }

    const headers = {
      'content-Type': 'application/json'
    }

    const requestOption = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data)
    }

    const res = await fetch(url, requestOption)
    const jsondata = await res.json()
    const result = jsondata.data.password
    setResultedPassword(result)
    console.log(jsondata.data.password)
  }

  function getRange(e) {
    setRange(e.target.value)
    console.log(range)
  }

  function changePass(e) {
    console.log(e.target.value)
    setPass(e.target.value)
  }

  function copyPass(e)
  {
    navigator.clipboard.writeText(resultedPassword)
    alert('copied')
  }

  async function checkPass(e) {
    e.preventDefault()
    console.log(pass)
    console.log('check password submit button clicked ')

    const url = process.env.REACT_APP_BASE_API + "/api/checkPass"
    console.log(process.env.REACT_APP_BASE_API, url)

    const data = {
      "password": pass
    }

    const headers = {
      'content-Type': 'application/json'
    }

    const requestOption = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data)
    }

    const res = await fetch(url, requestOption)
    const jsondata = await res.json()
    const result = jsondata.data
    setCheckResult(result)
    console.log(jsondata.data)
  }


  return (
    <div className="App">
      <div className='container-fluid'>
        <p className='text-center fs-1 fw-bold m-5 p-auto'>
          Password generator and checker app
        </p>
        <div className='cotainer-fluid p-3 m-3 g-5'>
          <row className='row g-5'>
            <div className='col-xs-12 col-md-6 border border-primary'>
              <div className='col-md-12'>
                <p className='text-center fs-3 fw-bold m-5 p-auto'>
                  Password generator
                </p>

                <form className='m-3'>
                  <div class="form-group row">
                    <label className='fs-3 m-2'>Secured Password</label><br></br>

                    <div class="input-group mb-3">
                    <input class="form-control" id="password" placeholder="Password" value={resultedPassword ? resultedPassword : 'password'} />
                        <div class="input-group-append">
                        <button type="button" class="btn btn-lg btn-primary" onClick={() => {copyPass()}} data-toggle="popover" data-content="Password Copied">Copy</button>
                        </div>

                    </div>

                  </div>
                  <br></br>
                  <label for="customRange3" class="form-label fs-3 m-2">Password length : {range && <p> {range}</p>} </label>
                  <input type="range" class="form-range" min="6" max="50" step="1" id="customRange3" onChange={(e) => { getRange(e) }}></input>
                  <br></br><br></br>
                  <div class="col-12">
                    <button class="btn btn-lg btn-primary m-2" type="submit" onClick={(e) => getPass(e)}>Submit</button>
                  </div>

                  <br></br><br></br>

                </form>
              </div>

            </div>
            <div className='col-xs-12 col-md-6 border border-primary'>
              <div className='col-md-12'>
                <p className='text-center fs-3 fw-bold m-5 p-auto'>
                  Password checker
                </p>
                <form className='m-3'>
                  <div class="form-group row">
                    <label className='fs-3 m-2'>Enter Password</label><br></br>
                    <div class="col-sm-10 m-2 p-4">
                      <input class="form-control" id="password" onChange={(e) => changePass(e)} placeholder="Password" />
                    </div>
                    <div class="col-12 m-2">
                      <button class="btn btn-lg btn-primary" type="submit" onClick={checkPass}>Submit</button>
                    </div>
                  </div>
                </form>
                {
                  checkResult && (
                    <div class="card-body">
                      <h5 class="card-title">{checkResult.score}</h5>
                      <p class="card-text">{checkResult.info}</p>
                    </div>)
                }
              </div>
            </div>
          </row>
        </div>
      </div>

    </div>
  );
}

export default App;

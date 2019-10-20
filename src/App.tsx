import React, {useState} from 'react';

function App() {
  const form: any = useFormInput(init);
  return (
    <div>
      <form>
        <input type='text' placeholder='username' {...form.username} />
        <input type='password' placeholder='password' {...form.password} />
        <input type='submit' />
      </form>
      <pre>{ JSON.stringify(form, null, 2) }</pre>
    </div>
  );
}

const init = {
  username: {
    value: 'myusr',
    onChange: (e: any) => {
      console.log('usr', e.target.value)
    }
  },
  password: {
    value: 'mypass',
    onChange: (e: any) => {
      console.log('pass', e.target.value)
    }
  }
};

function useFormInput (initialValue: any) {
  const [state, setState] = useState(initialValue);

  const tmp = Object.keys(state).map((input: any) => {
    return {
      [input]: {
        value: state[input].value,
        onChange: (event: any) => {
          state[input].onChange(event);
          setState({
            ...state,
            [input]: {
              value: event.target.value,
              onChange: state[input].onChange
              }
          });
        }
      }
    }
  });

  const result = Object.assign({}, ...tmp);

  return { ...result };
}

export default App;

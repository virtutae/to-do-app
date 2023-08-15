import AppHeader from "./components/AppHeader";



function App(): JSX.Element {
  
  
  return( 
  <>
    <AppHeader/>
    <InputBox/>
    <ListOfItems/>
  </>
  
  )
}

export default App;

 
function InputBox():JSX.Element{
  // const [inputValue, setInputValue] = useState('');


return (
  <>
    <input type="text" className="input-bar" placeholder="Add the task here"/>
    <button type="button" className="add-button">Add item</button>
  </>

)
}

function ListOfItems (): JSX.Element {
  return (
    <>
    </>
  )
}
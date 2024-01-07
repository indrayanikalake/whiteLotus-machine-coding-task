
import './App.css';
import { useState,useEffect } from 'react';
import { MyComponent, SignIn, SignUp, ThreeDFace, UserInfo } from './components';
import { AuthState } from './components/context/authContext';

const   users = JSON.parse(localStorage.getItem("users")).map(e=>e.name);

function App() {
  const {toggle, searchusers} = AuthState();

   const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
   const [userNames,setUserNames] = useState(JSON.parse(localStorage.getItem("users")).map(e=>e.name));

  useEffect(()=>{
  setUserNames(JSON.parse(localStorage.getItem("users")).map(e=>e.name))
  },[isFocused])

  console.log(userNames);

  useEffect(() => {
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
      const filteredSuggestions = userNames.filter((name) =>
        name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    };

    // Trigger filtering when input is focused
    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const input = document.getElementById('searchInput');
    input.addEventListener('input', handleInputChange);
    input.addEventListener('focus', handleInputFocus);

    // Cleanup function to remove event listeners
    return () => {
      input.removeEventListener('input', handleInputChange);
      input.removeEventListener('focus', handleInputFocus);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]); 

  };

  const onChange = (e) =>{
    setSearchQuery(e.target.value)
    const sugeested = userNames.filter(item=>{
   const data = searchQuery.toLowerCase()
   return data && item.toLowerCase().startsWith(data)
  })
    setSuggestions(sugeested);
  }

  return (
   <div className=' bg-black'>
    <div className='text-white'>
      <input
        type="text"
        id="searchInput"
        value={searchQuery}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for users"
        className=' bg-slate-800 md:w-[850px] p-2 m-5 rounded-md shadow-md shadow-slate-700'
      />
      {isFocused && suggestions.length > 0 && (
        <div>
     <ul>
  {suggestions.map((suggestion) => (
    <li key={suggestion}
    className='bg-slate-500 rounded-md text-white ml-4'
    onClick={() => handleSuggestionClick(suggestion)}>
      {suggestion} {/* Check for each suggestion */}
    </li>
  ))}
</ul>

</div>
      )}
    </div>
   <div className=' lg:flex space-x-2 '>
    <div className='hidden md:block' >
    <ThreeDFace />
   
    <div className='absolute top-40 left-14 w-1 sm:h-80 h-40 bg-gradient-to-b from-white to-violet'/>
    <p className='absolute top-56 left-20 text-6xl font-serif font-bold pink-text-gradient'>WhiteLotus!! </p>
    <p className='absolute top-72 left-20 text-2xl  font-medium text-white'>get the users from all over the world </p>
    </div>
    <div className='backgroundimage'>
    {toggle? <SignIn /> :  <SignUp />}
     <MyComponent />
    </div>
   </div>
  
    <UserInfo />
   </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import {Box,debounce,Stack} from '@mui/material';
import Masonry from '@mui/lab/Masonry';


let page=1;
function App() {
  const [results,setResults]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [query,setQuery]=useState("earth");
  
  
  let key = "oaa2R8VcnhzpOUnheDEz8BxZaIbHAWs6TBHc2-s6qsE";
  


  async function getData(number,limit){

      let url="https://api.unsplash.com/search/photos/?client_id="+key+"&query="+query+"&page="+number+"&per_page="+limit;

      console.log(url)
        let res=await fetch(url);
        let data = await res.json();
        //  console.log([...results,...data.results]);
        let old = [...results,...data.results];
        console.log(old);
        setResults(old);

  }


  function debounce(func)
  {
    let timerId;

    return function(...args)
    {
      let context=this;

      if(timerId)
        clearTimeout(timerId);
      timerId=setTimeout(()=>{
        func.apply(context,args);
      },800)


    }
  }


  let improvised = debounce(getData);



  




  
  useEffect(()=>{

    //getData(1,5);
    improvised(1,30)
    window.addEventListener('scroll',(e)=>{
      //console.log("results length",results.length);
      let userScrollHeight = window.innerHeight + window.scrollY;
      let windowBottomHeight = document.documentElement.offsetHeight;
      if (userScrollHeight >= windowBottomHeight) {
        //console.log("new page",page);
        page++;
        console.log(page);
        //getData(page,30)
        improvised(page,30)
      }
    },{passive:false});
  },[page]);


  return (
    <>
    <Box>
    {/*     <p>Query is {query}</p> */}

{/*         {console.log("Results ",results)} */}

        <Masonry columns={5} spacing={1}>
        {results.length > 1 ? results.map((el,index)=>{                                        
                  return <img key={index}  alt={index} src={el.urls.thumb} />;
                  
                          
                         
            }) :null}
        </Masonry>    
        


    </Box>
    </>
  );
}

export default App;

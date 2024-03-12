import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Box from './Box';

function App() {
  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  const [size, setSizes] =  useState(100);
  const [isDark, setIsDark] = useState(false);


  // 초기에 Change Theme 버튼 누를 시, isDark의 state 상태변화로 인해, 박스 키우기 콘솔이 그대로 누른 횟수만큼 노출된다. 그걸 방지 하여 size만 바뀔때 나오게끔 처리!
  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor : 'pink',
      width : `${size}px`,
      height : `${size}px`,
    };
  }, [size]);

  // 함수도 엄연히 말하면 함수'객체' 다 someFunction안에 담기어 새롭게 저장!
  const someFunction = useCallback (() => {
    console.log(`someFunc: number : ${number}`);
    return;
  },[number]);

  //의존성 배열 안의 someFunction이 바뀔때에만 실행하게 하고 싶으나, state를 변경했으므로 이거는 숫자 증가할때마다 실행!
  useEffect(()=>{
    console.log("someFunc가 실행");
  },[someFunction]);

  return (
    <div style= {{background : isDark? 'black' : 'white'}}>
      <input type="number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      />
     <button onClick={()=> setToggle(!toggle)}>{toggle.toString()}</button> 
     <br />
     <button onClick={someFunction}>Call someFunc</button>      
     <br /><br /><br /><br /><br />

     <input 
      type="number"
      value={size}
      onChange={(e) => {setSizes(e.target.value)}}
     />     
     <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
     <Box createBoxStyle={createBoxStyle} />
    </div> 

    
          
  );
}

export default App;

/*
  useCallback - Memoization 이용!

  //useMemo 와 달리 callback 함수 그 자체를 Memoization
  useCallback(() => {
    return value;
  }, [item])

  ex) const calculate = useCallback((num) => {
                          return num + 1;
                        }, [item]);

        // calculate 는 의존성 배열 내부 즉, item 값이 변경되지 않는 이상 다시 초기화 안됨!

 */
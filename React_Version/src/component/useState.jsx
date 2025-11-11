// import React from "react";
// import { useState } from "react";
// function ChangeName (){
//     const [name, setName] = useState("Sukhpreet");
//     function handleChangeName() {
//         setName("Sukhpreet Singh");
//     }

//     return (
//         <div>
//             <h1>Name : {name}</h1>
//             {/* <button onClick={ () => setName("Sukhpreet Singh")}>Change</button> */}
//             <button onClick={handleChangeName}>Change</button>
//         </div>
//     );
// }
// export default ChangeName ;


import React, { useState, useEffect } from "react";

function HelloWorldAfter1Sec() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Hello World");
      console.log("Hello World");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>{message || "Waiting for message..."}</h1>
    </div>
  );
}

export default HelloWorldAfter1Sec;

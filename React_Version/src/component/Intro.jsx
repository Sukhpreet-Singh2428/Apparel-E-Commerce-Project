import React from "react";

function ParentComponent(){
    const userName = "Alice";
    const userAge = 30;
    return (
        <ChildComponent name = {userName} age={userAge}></ChildComponent>
    );
}
export default ParentComponent;
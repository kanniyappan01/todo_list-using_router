export const initialState = {
    isvalid : false,
    products:[
        {id:1,productName:'apple',price:175,qty:1},
        {id:2,productName:'orange',price:250,qty:1},
        {id:3,productName:'banana',price:60,qty:1},
    ]
}

export const updateState = (state,action)=>{
    
    console.log("action",action.payload)
    switch(action.type){
        case "add_to_cart":
            return {
                ...state,
                products: action.payload,
            }
        default:
            return state
    }
}
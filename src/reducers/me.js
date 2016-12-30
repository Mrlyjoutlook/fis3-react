export default function (state={name:''},action){
  switch (action.type){
    case 'GETNAME':
      return {name:action.text}
      break;
    default:
      return state;
      break;
  }
}
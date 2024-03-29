import React, {useState} from 'react'

const Accordion =(props)=>{

return (
    <div class='col'>
      <h2>{props.title}</h2>
      <div id={props.id} class='accordion'>
            {props.accordionData.map(({ title, content }) => (
              <AccordionItem title={title} content={content} />
            ))}
      </div>
    </div>
);
}
const AccordionItem=({ title, content })=>{
const [isActive, setIsActive] = useState(false);
return (
  <div class='accordion_item clickable' onClick={() => setIsActive(!isActive)}>
    <div class='accordion-title'>
      <h2>{title}</h2>
    </div>
    {isActive && <div class='accordion-content'>{content}</div>}
  </div>

)
}
export default Accordion;

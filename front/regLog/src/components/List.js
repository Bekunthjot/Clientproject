import { useState } from "react";
import './List.css';
let module = require('./Listy.js');


function List(props) {
    let serviceList = module.serviceList;
    var num=props.ini;
//   const [serviceList, setServiceList] = useState([num:[{ service: "" }]]);

serviceList[num]=[{service:""}]

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList[num]];
    list[index][name] = value;
    serviceList[num]=list;
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList[num]];
    list.splice(index, 1);
    serviceList[num]=list;
  };

  const handleServiceAdd = () => {
    serviceList=[...serviceList[num], { service: "" }];
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {serviceList[num].map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </form>
  );
}

export default List;
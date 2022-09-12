import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./style.scss";

const ComponentPropTypes = {
  selectedPermission: PropTypes.string.isRequired,
  setPermission: PropTypes.func.isRequired,
};

type ComponentTypes = InferProps<typeof ComponentPropTypes>;
const Dropdown = ({ selectedPermission, setPermission }: ComponentTypes) => {

  const permissions = [
    {
      id: 1,
      value: "Full access"
    },
    {
      id: 2,
      value: "Can edit"
    },
    {
      id: 3,
      value: "Can view"
    },
    {
      id: 4,
      value: "No access"
    }
  ]

  return (
    <div style={{  }} className="dropdown">
      <select name="permissions" id="permissions" className="dropdown-select" onChange={(e) => setPermission(e.target.value)} value={selectedPermission}>
        {
          permissions.map(p => <option key={p.id} value={p.value}>{p.value}</option>)
        }
      </select>
    </div>
  )
}

export default Dropdown;
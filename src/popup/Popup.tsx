import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import "../index.css";
import "./style.scss";
import Pill from "../pill";
import Dropdown from "../drop-down";
const prod =  require("../../assets/prod.svg")
const eng =  require("../../assets/eng.svg")
const oslash = require("../../assets/oslash.jpeg")

const ComponentPropTypes = {
  headerTitle: PropTypes.string.isRequired,
  headerDescription: PropTypes.string.isRequired,
  bodyTitle: PropTypes.string.isRequired,
  bodyDescription: PropTypes.string.isRequired,
  isShareActive: PropTypes.bool.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  setSearchActive: PropTypes.func.isRequired
};

const peopleData = [
  {
    name: "Wade Cooper",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_kcIiGCUdlQDi5AmeHqSu-8xomV24HzGYsQ&usqp=CAU",
    email: "wade@oslash.com"
  },
  {
    name: "Arlene Mccoy",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6FOjQ4Ni-Ccfw0DFKsv-BQmmV6xcIg7IHw&usqp=CAU",
    email: "arlene@oslash.com"
  }
]

const groupData = [
  {
    name: "Product",
    dp: prod,
    email: "product@oslash.com"
  },
  {
    name: "Engineering",
    dp: eng,
    email: "engineering@oslash.com"
  }
]

type ComponentTypes = InferProps<typeof ComponentPropTypes>;
const Popup = ({ isShareActive, headerTitle, headerDescription, bodyTitle, bodyDescription, isSearchActive, setSearchActive }: ComponentTypes) => {
  const [searchText, setSearchText] = useState('')
  const [people, setPeople] = useState(peopleData)
  const [group, setGroup] = useState(groupData)
  const [selectedEntity, setSelectedEntity] = useState([])
  const [selectedPermission, setPermission] = useState("Full access")
  const [entityWithAccess, setEntityWithAccess] = useState([
    {
      "title": "Everyone at OSlash",
      "desc": "25 workspace members",
      "dp": oslash,
      "access": "Full access"
    }
  ])

  useEffect(() => {
    console.log(searchText)
    if (searchText) {
      const re = new RegExp(searchText, "gi")
      const peopleSearch = peopleData.reduce((acc, p)  => {
        if (p.name && p.name.match(re)) {
          acc.push(p)
        }
        return acc
      }, []);
      setPeople(peopleSearch)

      const groupSearch = groupData.reduce((acc, g) => {
        if (g.name && g.name.match(re)) {
          acc.push(g)
          console.log(g.name)
        }
        return acc
      }, []);
      setGroup(groupSearch)
    } else {
      setGroup(groupData)
      setPeople(peopleData)
    }
  }, [searchText])

  useEffect(() => {
    if (selectedEntity.length > 0) {
      let selectedEntityWithAccess = [...selectedEntity]
      selectedEntityWithAccess.map(entity => {
        console.log(entity)
        entity.access = selectedPermission
      })
      console.log("selectedEntityWithAccess---", selectedEntityWithAccess)
      setSelectedEntity(selectedEntityWithAccess)
    }
  }, [selectedPermission])

  const handleKeyHandler = (e) => {
    if(e.key === "Enter") {
      console.log("Enter key pressed")
      setSearchText('')
      let selectedEntityArr: any[] = [...selectedEntity]
      const entities = people.concat(group)
      entities.length > 0 && entities.map((entity: object)=> {
        console.log('selectedPermission--', selectedPermission)
        selectedEntityArr.push(entity)
      })
      setSelectedEntity(selectedEntityArr)
      console.log('selectedEntityArr', selectedEntityArr)
    }
  }

  const inviteClickHandler = () => {
    let entities = [...entityWithAccess]
    selectedEntity.forEach((e) => {
      let entity = {}
      const isDuplicate = entities.some(entity => entity.title == e.name)
      console.log("isDuplicate", isDuplicate)
      if(!isDuplicate) {
        entity.title = e.name;
        entity.desc = e.email;
        entity.dp = e.dp;
        entity.access = e.access;
        entities = entities.concat([entity])
      }
    })
    setEntityWithAccess(entities)
    setSearchActive(false)
    setSelectedEntity([])
  }

  return (
    <div>
      {
        isShareActive ? (
          <div className="popup">
            {
              !isSearchActive ? (
                <div className="popup__header">
                  <div className="popup__header-c1">
                    <img src={require('../../assets/globe.svg')} width="32px"/>
                  </div>
                  <div className="popup__header-c2">
                    <p className="popup__header-c2-title">{headerTitle}</p>
                    <p className="popup__header-c2-description">{headerDescription}</p>
                  </div>
                  <div className="popup__header-c3">
                  </div>
                </div>
              ): null
            }
            {!isSearchActive ? <hr className="popup__header-line"/> : null}
            <div className="input">
              {
                selectedEntity.map(entity => <Pill title={entity.name} selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />)
              }
              <input 
                autoComplete="off"
                className="input-box"
                type="text"
                value={searchText}
                placeholder="People, emails, groups"
                onClick={() => setSearchActive(true)}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => handleKeyHandler(e)}
              />
              {isSearchActive ? <Dropdown selectedPermission={selectedPermission} setPermission={setPermission} /> : null}
              <button className="input-button" onClick={() => inviteClickHandler()}>Invite</button>
            </div>
            {
              !isSearchActive ? (
                entityWithAccess.map(entity => (
                  <div className="popup__header">
                    <div className="popup__header-c1">
                      <img src={entity.dp} width="32px" />
                    </div>
                    <div className="popup__header-c2">
                      <p className="popup__header-c2-title">{entity.title}</p>
                      <p className="popup__header-c2-description">{entity.desc}</p>
                    </div>
                    <div className="popup__header--c3">
                      <Dropdown selectedPermission={entity.access} setPermission={setPermission} />
                    </div>
                  </div>
                ))
              ): null
            }
            {
              isSearchActive ? (
                <div className="search-modal">
                  <div className="search-modal__person">
                    {
                      people.length > 0 ? (
                        <>
                          <p className="search-modal__person__title">Select a person</p>
                          {
                            people.map(p => (
                              <div className={people.length == 1 && group.length == 0 ? "search-modal__person__desc search-modal__person__desc--active" : "search-modal__person__desc"}>
                                <img className="search-modal__person__desc-c1" src={p.dp} />
                                <p className="search-modal__person__desc-c2">{p.name}</p>
                              </div>
                            ))
                          }
                        </>
                      ): null
                    }
                  </div>
                  <div className="search-modal__group">
                    {
                      group.length > 0 ? (
                        <>
                          <p className="search-modal__group__title">Select a group</p>
                          {
                            group.map(g => (
                              <div className={group.length == 1 && people.length == 0 ? "search-modal__group__desc search-modal__group__desc--active" : "search-modal__group__desc"}>
                                <img className="search-modal__group__desc-c1" src={g.dp} />
                                <p className="search-modal__group__desc-c2">{g.name}</p>
                              </div>
                            ))
                          }
                        </>
                      ): null
                    }
                  </div>
                  <div className="search-modal__footer">
                    <button className="search-modal__footer-button" onClick={() => {
                      setSearchActive(false)
                      setSelectedEntity([])
                      setSearchText('')
                    }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ): null
            }
          </div>
        ): null
      }
    </div>
  )
}

export default Popup;
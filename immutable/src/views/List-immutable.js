import React, { Component } from 'react'

// import isEqual from 'lodash/isEqual'
// import cloneDeep from 'lodash/cloneDeep';
// import Immutable from 'seamless-immutable'
import {List,is,fromJS} from 'immutable';

import DATA from '../data.json'




class PlayerItem extends Component{

  shouldComponentUpdate(nextProps,nextState){
    // console.time('cost time')
    // let flag = !isEqual(nextProps.item,this.props.item);
    let flag = !is(nextProps.item,this.props.item)
    // console.timeEnd('cost time')
    return flag;
  }


  
  render(){
    console.log('render Item')
    let player = this.props.item.toJS();
    return <div className='player'>
      <div>{player.name} -- {player.age}</div>
      <div>
        {player.skills.map((skill,i)=>{
          return <span key={'skill-'+i}>{skill.name}:{skill.lv}  </span>
        })}
      </div>
    </div>
  }

}



export default class Home extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    list:List()
  }

  componentDidMount(){


    this.setState({
      // list:Immutable(DATA.list),
      list: fromJS(DATA.list)
    })

  }

  shouldComponentUpdate(nextProps,nextState){
    return !is(nextState.list,this.state.list)
  }

  handleClick(){
    let list = this.state.list
    
    let index1,index2,index3;
    list.forEach((team,i)=>{
      if(team.get('name') === 'TOT'){
        index1 =i
        team.get('players').forEach((player,j)=>{
          if(player.get('name') === 'Kane'){
            index2 = j
            player.get('skills').forEach((skill,k)=>{
              if(skill.get('name') === 'shoot'){
                index3 =k
              }
            })
          }
        })
      }
    })


    this.setState({
      // list:Immutable.setIn(list,[index1,'players',index2,'skills',index3,'lv'], 100)
      list: list.setIn([index1,'players',index2,'skills',index3,'lv'], 100)
    })

  }

  render() {
    console.log('render List')
    let list= this.state.list;
    return (
      <div>
        {list.size > 0 ? 
        <ul>

          {
            list.map((item,index)=>{
              return <li key={'team-'+index}>
                <h2>{item.get('name')}</h2>
                {item.get('players').map((player,ind)=>{
                  return <PlayerItem key={'player-'+ind} item={player} />
                })}
              </li>
            })  
          }
        </ul>:
        <div>no result</div>
        }
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}

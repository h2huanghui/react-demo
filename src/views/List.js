import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'


import DATA from '../data.json'



class PlayerItem extends Component{

//   shouldComponentUpdate(nextProps,nextState){
//     return !isEqual(nextProps.item,this.props.item);
//   }


  
  render(){
    console.log('render Item')
    let player = this.props.item;
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
    list: []
  }

//   shouldComponentUpdate(nextProps,nextState){
//     return !isEqual(nextState.list,this.state.list)
//   }

  componentDidMount(){

    this.setState({
      list: DATA.list
    })

  }


  handleClick(){
    let list = cloneDeep(this.state.list);
    
    // let index1,index2,index3;
    list.forEach((team,i)=>{
      if(team['name'] === 'TOT'){
        // index1 =i
        team['players'].forEach((player,j)=>{
          if(player['name'] === 'Kane'){
            // index2 = j
            player['skills'].forEach((skill,k)=>{
              if(skill['name'] === 'shoot'){
                // index3 =k;
                skill['lv'] = 100
              }
            })
          }
        })
      }
    })


    this.setState({
      list
    })

  }

  render() {
    console.log('render List')
    let list= this.state.list;
    return (
      <div>
        {list.length > 0 ? 
        <ul>
          {
            list.map((item,index)=>{
              return <li key={'team-'+index}>
                <h2>{item['name']}</h2>
                {item['players'].map((player,ind)=>{
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

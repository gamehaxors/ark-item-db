import React from 'react';
import getItems from './arkItems';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import Clipboard from 'clipboard';

let arkItems = getItems();

if (window.localStorage) {
  let ls_items = window.localStorage.getItem('arkItems');
  if (ls_items) {
    ls_items = JSON.parse(ls_items);
    Object.keys(ls_items).map((index) => { arkItems[index] = ls_items[index]});
  }
}

const saveItem = (item) => {
  if (window.localStorage) {
    let ls_items = window.localStorage.getItem('arkItems');
    if (ls_items) ls_items = JSON.parse(ls_items);
    else ls_items = {};
    ls_items[item.index] = item;
    window.localStorage.setItem('arkItems', JSON.stringify(ls_items));
  }
};

const getStateItems = (q) => {
  let re = new RegExp(q, 'i');
  let items = arkItems.filter((i)=> {return i.name.match(re)});
  if (window.localStorage) {
    let ls_items = window.localStorage.getItem('arkItems');
    ls_items = ls_items ? JSON.parse(ls_items) : {};
    items = items.map((i)=>{
        if (ls_items[i.index]) {
          return ls_items[i.index];
        }
      return i;
    });
  }
  return items;
};

class DashboardPage extends React.Component {
  constructor() {
    super();

    this.render = this.render.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetQuantites = this.handleResetQuantites.bind(this);
    this.clipper = false;

    this.state = {
      q: '',
      items: getStateItems('')
    };

  }

  componentWillMount() {
    if (this.props.params && this.props.params.q) {
      this.setState({q:this.props.params.q,items:getStateItems(this.props.params.q)});
    }
  }

  componentDidMount() {
    this.clipper = new Clipboard('.copy-btn');
  }

  componentDidUpdate() {
    this.clipper = new Clipboard('.copy-btn');
  }


  componentWillUnmount() {
    this.clipper.destroy();
  }

  componentWillUpdate() {
    this.clipper.destroy();
  }

  handleSearch(e) {
    e.preventDefault();
    let q = this.searchInput.refs.input.value.trim();
    if (q) {
      window.location.href = window.location.pathname + '#/search/' + q;
    } else {
      window.location.href = window.location.pathname + '#/';
    }
    this.setState({q:q,items:getStateItems(q)});
  }
  render() {
    return(
      <div>
        <div className="jumbotron">
          <h1>Ark Item DB</h1>
          <p>Cheat Code Generator for Ark: Survival Evolved. <a href="https://github.com/gamehaxors/ark-item-db/blob/master/README.md">README</a></p>
          {this._renderSearchForm()}
        </div>
        <div style={{maxWidth:800, margin:'0 auto'}}>
          <a className="pull-right" href='#' onClick={this.handleResetQuantites}>Reset QTYs</a><h2>Items</h2>
          <div className="rows-striped">
            {this._renderList()}
          </div>
        </div>
      </div>
    );
  }

  handleResetQuantites() {
    window.localStorage.removeItem('arkItems');
    arkItems = getItems();
    this.setState({items:getStateItems(this.state.q)});
  }

  handleQty(i,evt) {
    let v = parseInt(evt.currentTarget.value);
    if (isNaN(v)) v = arkItems[i.index].qty;
    if (v < 1) return;
    arkItems[i.index].qty = v;
    saveItem(arkItems[i.index]);
    this.setState({items:getStateItems(this.state.q)});
  }

  _renderList() {
    let items = this.state.items;
    //let oneThird = Math.ceil(items.length / 3);
    return items.map( (item,i) => {
      let cheatCode = "cheat giveItem";
      if (!isNaN(parseInt(item.id))) cheatCode += 'Num';
      cheatCode += ' ' + item.id + ' 100 1 false';
      return (<div className="row-fluid clearfix" key={"item-row"+i}>
        <div className="col-sm-9" style={{fontSize: 18}}>
          {item.name}
        </div>
        <div className="col-sm-2">
          <Input id={"item-"+i} type="number" value={item.qty} className="form-control" onChange={this.handleQty.bind(this,item)}/>
        </div>
        <div className="col-sm-1">
          <a className="btn btn-primary copy-btn" data-clipboard-text={cheatCode}><i className="fa fa-copy" /></a>
        </div>
      </div>);
    });

  }

  _renderSearchForm() {

    return(
      <form onSubmit={this.handleSearch} style={{maxWidth:480,margin:'0 auto'}}>
        <div className="row">
          <div className="col-xs-11"><Input ref={(ref) => this.searchInput = ref} type="text" defaultValue={this.state.q} placeholder="search here..." onChange={this.handleSearch} /></div>
          <div className="col-xs-1"><Button><i className="fa fa-search" /></Button></div>
        </div>
      </form>
    )
  }

}

export default DashboardPage;
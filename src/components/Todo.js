import React, { useState } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useFirebaseStorage from '../hooks/firebaseStorage';

/* ライブラリ */
// import {getKey} from "../lib/util";

function Todo() {
  const [items, addItem, updateItem, clearItems] = useFirebaseStorage();
  
  const [filter, setFilter] = React.useState('ALL');

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = (changedItem, isCheck) => {
    updateItem(changedItem, isCheck);
  };
  
  const handleAdd = text => {
    addItem({ text, done: false });
  };
  
  const handleFilterChange = (value) => {setFilter(value)};

  return (
    <article class="panel is-danger">
      <div className="panel-heading">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter value={filter} onChange={handleFilterChange} />
      {displayItems.map(item => (
        <TodoItem key={item.id} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;
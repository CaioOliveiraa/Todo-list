import React, { useEffect, useState } from 'react';
import List from './components/List';
import TodoForm from './components/TodoForm';
import Item from './components/Item';
import './Todo.css';
import Modal from './components/Modal'

const SAVED_ITEMS = 'savedItems';

function Todo() {

    const [showModal, setShowModal] = useState(false)

    // Inicializar os itens do localStorage ou como um array vazio
    const [items, setItems] = useState(() => {
        return JSON.parse(localStorage.getItem(SAVED_ITEMS)) || []
    });

    // Carregar itens do localStorage quando o componente monta
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if (savedItems) {
            setItems(savedItems);
        }
    }, []);
    
    // Salvar itens no localStorage sempre que a lista de itens mudar
    useEffect(() => {
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }, [items]);
    
    // Adicionar um novo item
    function onAddItem(text) {
        const item = new Item(text);
        setItems([...items, item]);
        onHideModal();
    }

    // Deletar um item
    function onItemDeleted(item) {
        const filteredItems = items.filter(it => it.id !== item.id);
        setItems(filteredItems);
    }

    // Alternar estado de done de um item
    function onDone(item) {
        const updatedItems = items.map(it => {
            if (it.id === item.id) {
                it.done = !it.done;
            }
            return it;
        });
        setItems(updatedItems);
    }

    // Alterar o estado do modal
    function onHideModal() {
        setShowModal(false)
    }

    return (
        <div className="container">
            <header className='header'>
                <h1>Todo</h1>
                <button onClick={() => { setShowModal(true) }} className='addBtn'>+</button>
            </header>
            <List onDone={onDone} onItemDeleted={onItemDeleted} items={items} />
            <Modal show={showModal} onHideModal={onHideModal}><TodoForm onAddItem={onAddItem}></TodoForm></Modal>
        </div>
    );
}

export default Todo;

import { useState, useEffect } from 'react';

/* ライブラリ */
import { addFirebaseItem, updateFirebaseItem, getFirebaseItems, clearFirebaseItem } from "../lib/firebase";

export default function useFirebaseStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [items]);

    const getItems = async () => {
        const _items = await getFirebaseItems();
        setItems(_items);
    };

    const addItem = async item => {
        const newItem = { text: item.text, done: item.done };
        await addFirebaseItem(newItem);
        setItems([...items, newItem]);
    };

    const updateItem = async (changedItem, isCheck) => {
        const newItem = { ...changedItem, done: isCheck };
        await updateFirebaseItem(newItem, changedItem.id);
        const newItems = items.map((item) => {
            if (item.id === changedItem.id) {
                item.done = isCheck;
            }
            return item;
        })
        setItems(newItems);
    }

    const clearItems = () => {
        items.map(item => {
            clearFirebaseItem(item);
        })
        setItems([]);
    };

    return [items, addItem, updateItem, clearItems];
};
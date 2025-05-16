'use client';

import { useRouter } from 'next/navigation';  // 引入Next.js的路由導航
import { useEffect, useState } from 'react';  // 引入React的useState和useEffect hooks

export default function TaskDetail({ params }) {
    const router = useRouter();  // 獲取路由對象
    const { id } = params;  // 獲取路由參數中的id
    const [title, setTitle] = useState('');  // 定義任務標題狀態
    const [description, setDescription] = useState('');  // 定義任務描述狀態

    const handleSave = () => {
        const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];  // 獲取本地存儲中的任務列表
        const updatedTasks = saveTasks.map((task) => 
            task.id === id ? { ...task, title, description } : task
        );  // 更新任務列表
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // 保存更新後的任務列表到本地存儲
        router.push('/');  // 導航回主頁
    }

    useEffect(() => {
        const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];  // 獲取本地存儲中的任務列表
        const task = saveTasks.find((task) => task.id === Number(id));  // 根據id查找任務
        if (task) {
            setTitle(task.title);  // 設置任務標題
            setDescription(task.description);  // 設置任務描述
        }
    }, [id]);  // 當id改變時重新執行

    return(
        <main className='p-2 max-w-xl mx-auto'>
            <h1 className= 'text-2xl font-bold mb-4'>
                Task Detail
            </h1>
            <input
                className='border p-2 w-full mb-2'
                value={title}
                onChange={(e) => setTitle(e.target.value)}  // 當輸入框的值改變時，更新title狀態
                placeholder='Title'
            />
            <textarea
                className='border p-2 w-full mb-4'
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // 當輸入框的值改變時，更新description狀態
                placeholder='Description'
                rows={4}
            />
            <button
                className='bg-blue-500 text-white px-4 py-2'
                onClick={handleSave}  // 當按鈕被點擊時，調用handleSave函數
            >
                Save
            </button>

        </main>
    )
}

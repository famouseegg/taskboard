// This is a client component
'use client';
import { useState, useEffect } from 'react';  // 引入React的useState和useEffect hooks
export default function Todospage() {
    const [todos,setTodos] = useState([]);  // 儲存任務列表的狀態[名稱,set+名稱]
    const [newtodos, setNewtodos] = useState("");  // 儲存新任務
    const [loading,setLoading] = useState(true);  // 儲存加載狀態
    
    useEffect(() => {
        async function fetchTodos() {
            try{
                const res  = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');  // 獲取任務列表,limit=20表示限制返回20個任務
                console.log(res);  // 輸出請求結果
                if(!res.ok) 
                    throw new Error('Failed to fetch data');  // 如果請求失敗，拋出錯誤

                await  new Promise((resolve) => setTimeout(resolve, 3000));  // 模擬延遲3秒    

                const data = await res.json();  // 解析body為JSON格式
                setTodos(data);  // 更新任務列表狀態
                

            } catch (error) {
                console.log(error.message);  // 輸出錯誤信息
            } finally {
                setLoading(false);  // 無論請求成功或失敗，都設置加載狀態為false
            }
        }
        fetchTodos();  // 調用函數獲取任務列表
    })//

    return (
        <main className="p-4 max-w-xl mx-auto">  {/* 主要內容區域 */}
            <h1 className="text-2xl font-bold mb-4">Todos</h1>
            {loading && <p>Loading...</p>}  {/* 如果加載中，顯示加載提示 */}
            {!loading &&( 
                <ul className="space-y-2">  {/* 使用無序列表來展示任務，設定間距樣式 */}
                    {todos.map((todo) => (  // 使用 map 方法遍歷所有任務並渲染
                        <li key={todo.id} className="border p-2 rounded">  {/* 每個任務項目 */}
                            <h2 className='font-semibold'>
                                {todo.title}  {/* 顯示任務標題 */}
                                {todo.completed ? 'Done' : ''}  {/* 根據任務狀態顯示完成或未完成 */}
                            </h2>
                        </li>
                    ))}
                </ul>
            )}

        </main>
    );
}
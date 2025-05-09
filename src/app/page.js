'use client';  // 聲明這是一個客戶端組件


// 引入必要的組件和hooks
import TaskList from "@/components/TaskList";  // 引入任務列表組件
import Link from "next/link";  // 引入Next.js的圖片組件
import { useState,useEffect, use} from "react";  // 引入React的useState hook




// 主頁面組件
export default function Home() {
  // 定義狀態變量
  const [tasks, setTasks] = useState([]);  // 儲存所有任務的陣列
  const [newTask, setNewTask] = useState("");  // 儲存新任務的輸入值

  const [nextId, setNewId]= useState(1);  // 儲存下一個任務的ID
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];  // 從本地存儲獲取任務列表
    setTasks(savedTasks);  // 更新任務列表狀態
    setNewId(savedTasks.length + 1);  // 設置下一個任務的ID}
  },[]);
  // 添加新任務的函數
  const addTask = () => {
    // 檢查新任務是否為空
    if (newTask.trim() === "") {
      return;
    }
    console.log("Before:　",tasks);  // 輸出添加前的任務列表
    console.log("Now:　",newTask);  // 輸出當前要添加的任務
    const newTask0bj = {
      id: nextId,  // 設置任務ID
      title: newTask,  // 設置任務標題
      description: "",  // 設置任務描述為空
    }
    const updatedTasks = [...tasks, newTask, newTask0bj];  // 創建包含新任務的陣列
    setTasks(updatedTasks);  // 更新任務列表
    console.log("After： ",updatedTasks);  // 輸出添加後的任務列表
    setNewTask("");  // 清空輸入框

    setNewId(nextId + 1);  // 更新下一個任務的ID
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));  // 將更新後的任務列表保存到本地存儲
  }
  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);  // 過濾掉被刪除的任務
    setTasks(newTasks);  // 更新任務列表
    localStorage.setItem("tasks", JSON.stringify(newTasks));  // 將更新後的任務列表保存到本地存儲
  }
  // 渲染頁面內容
  return (
    <main className="p-4 max-w-md mx-auto">  {/* 主要內容區域 */}
      <h1 className="text-2xl font-bold">Welcome to Next.js!</h1>

      {/* 任務輸入區域 */}
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 flex-1 p-2"
          placeholder="En a tesk"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}  // 輸入框值改變時更新newTask狀態
        />
        <button 
          className="bg-blue-500 text-white px-4"
          onClick={addTask}  // 點擊按鈕時添加新任務
        >
          add
        </button>
      </div>
      {/* 顯示任務列表組件 */}
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </main>
  );
}

// TaskList 組件：用於顯示任務列表
// props:
// - tasks: 任務陣列
'use client';  // 使用客戶端組件
import Link from "next/link";

// - onDelete: 刪除任務的回調函數
export default function TaskList({ tasks, onDelete }) {
  return (
    // 使用無序列表來展示任務，設定間距樣式
    <ul className="space-y-2">
      {/* 使用 map 方法遍歷所有任務並渲染 */}
      {tasks.map((task) => (
        // 每個任務項目
        <li 
          key={task.id}  // React 需要的唯一 key 值
          className="border p-2 rounded  flex justify-between items-center"  // 設定邊框和圓角樣式
        >       
          <Link
            href={`/task/${task.id}`}  // 點擊任務時導航到詳細頁面
            className="text-blue-600 hover:underline"  // 設定藍色文字和懸停下劃線樣式

            
          >
            {task.title}  // 顯示任務標題
          </Link>
          {/* 顯示任務內容 */}
          

          {/* 刪除按鈕 */}
          <button
            className="text-red-500"  // 設定紅色文字樣式
            onClick={() => onDelete(T=text.id)}  // 點擊時調用刪除函數
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
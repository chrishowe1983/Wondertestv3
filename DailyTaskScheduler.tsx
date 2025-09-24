import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Star, Plus, Trash2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface DailyTaskSchedulerProps {
  onNavigate: (page: string) => void;
}

interface Task {
  id: string;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
  estimatedDuration: number;
}

export function DailyTaskScheduler({ onNavigate }: DailyTaskSchedulerProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Wrap presents for immediate family',
      time: '09:00',
      priority: 'high',
      category: 'Gift Prep',
      completed: false,
      estimatedDuration: 120
    },
    {
      id: '2',
      title: 'Order last-minute gifts online',
      time: '10:30',
      priority: 'high',
      category: 'Shopping',
      completed: true,
      estimatedDuration: 45
    },
    {
      id: '3',
      title: 'Confirm Christmas dinner headcount',
      time: '14:00',
      priority: 'medium',
      category: 'Planning',
      completed: false,
      estimatedDuration: 30
    },
    {
      id: '4',
      title: 'Prep cookie dough for baking session',
      time: '16:00',
      priority: 'medium',
      category: 'Cooking',
      completed: false,
      estimatedDuration: 60
    },
    {
      id: '5',
      title: 'Send holiday cards to extended family',
      time: '19:00',
      priority: 'low',
      category: 'Communication',
      completed: false,
      estimatedDuration: 90
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    priority: 'medium' as const,
    category: '',
    estimatedDuration: 30
  });

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const categoryColors = {
    'Gift Prep': 'bg-purple-100 text-purple-800',
    'Shopping': 'bg-blue-100 text-blue-800',
    'Planning': 'bg-orange-100 text-orange-800',
    'Cooking': 'bg-pink-100 text-pink-800',
    'Communication': 'bg-indigo-100 text-indigo-800',
    'Decorating': 'bg-emerald-100 text-emerald-800'
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = () => {
    if (newTask.title && newTask.time && newTask.category) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        ...newTask,
        completed: false
      }]);
      setNewTask({
        title: '',
        time: '',
        priority: 'medium',
        category: '',
        estimatedDuration: 30
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalEstimatedTime = tasks.filter(task => !task.completed).reduce((sum, task) => sum + task.estimatedDuration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('christmas')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Christmas
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F05959] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Daily Task Scheduler</h1>
                  <p className="text-gray-600 text-sm">Smart priority management for your holiday prep</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F05959]">{completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#57C289]">{Math.round(totalEstimatedTime / 60)}h</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F05959]" />
                  Today's Schedule
                </h2>
                <Badge variant="outline" className="text-[#F05959] border-[#F05959]">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </Badge>
              </div>

              <div className="space-y-3">
                {tasks.sort((a, b) => a.time.localeCompare(b.time)).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-[#F05959]/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-[#57C289] border-[#57C289] text-white' 
                            : 'border-gray-300 hover:border-[#F05959]'
                        }`}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-600">{task.time}</span>
                          <Badge className={priorityColors[task.priority]} variant="outline">
                            {task.priority}
                          </Badge>
                          <Badge 
                            className={categoryColors[task.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}
                            variant="outline"
                          >
                            {task.category}
                          </Badge>
                        </div>
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500">{task.estimatedDuration} minutes</p>
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Add New Task & AI Suggestions */}
          <div className="space-y-6">
            
            {/* Add New Task */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F05959]" />
                Add New Task
              </h3>
              
              <div className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  />
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <Input
                  placeholder="Category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                />

                <Input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newTask.estimatedDuration}
                  onChange={(e) => setNewTask({...newTask, estimatedDuration: parseInt(e.target.value) || 30})}
                />

                <Button 
                  onClick={addTask}
                  className="w-full bg-[#F05959] hover:bg-[#E54949] text-white"
                >
                  Add Task
                </Button>
              </div>
            </div>

            {/* AI Smart Suggestions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#0F73FF]" />
                AI Smart Suggestions
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#0F73FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Schedule Break</p>
                      <p className="text-xs text-gray-600">Consider adding a 15-min break after your 2-hour wrapping session</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#0F73FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Batch Similar Tasks</p>
                      <p className="text-xs text-gray-600">Group all gift-related tasks together for better efficiency</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#0F73FF] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Energy Level Optimization</p>
                      <p className="text-xs text-gray-600">Schedule creative tasks (like wrapping) when you're most energetic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
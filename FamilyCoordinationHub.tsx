import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Bell, MessageCircle, Calendar, ArrowLeft, Plus, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

interface FamilyCoordinationHubProps {
  onNavigate: (page: string) => void;
}

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  tasks: number;
  notifications: number;
}

interface Notification {
  id: string;
  type: 'task' | 'reminder' | 'update' | 'request';
  title: string;
  message: string;
  time: string;
  from: string;
  urgent: boolean;
  read: boolean;
}

interface FamilyTask {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export function FamilyCoordinationHub({ onNavigate }: FamilyCoordinationHubProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'tasks' | 'messages'>('notifications');

  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Mom (Sarah)',
      avatar: '👩‍🦰',
      role: 'Coordinator',
      status: 'online',
      tasks: 8,
      notifications: 3
    },
    {
      id: '2',
      name: 'Dad (Mike)',
      avatar: '👨‍🦲',
      role: 'Helper',
      status: 'busy',
      tasks: 5,
      notifications: 1
    },
    {
      id: '3',
      name: 'Emma (15)',
      avatar: '👧',
      role: 'Helper',
      status: 'online',
      tasks: 3,
      notifications: 2
    },
    {
      id: '4',
      name: 'Jake (12)',
      avatar: '👦',
      role: 'Helper',
      status: 'offline',
      tasks: 2,
      notifications: 0
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task',
      title: 'Task Completed',
      message: 'Emma finished wrapping the kids\' presents',
      time: '5 min ago',
      from: 'Emma',
      urgent: false,
      read: false
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Deadline Approaching',
      message: 'Christmas dinner shopping needs to be done by tomorrow',
      time: '1 hour ago',
      from: 'System',
      urgent: true,
      read: false
    },
    {
      id: '3',
      type: 'request',
      title: 'Help Needed',
      message: 'Dad needs help moving the Christmas tree',
      time: '2 hours ago',
      from: 'Mike',
      urgent: false,
      read: false
    },
    {
      id: '4',
      type: 'update',
      title: 'Schedule Change',
      message: 'Christmas movie night moved to 7 PM',
      time: '3 hours ago',
      from: 'Sarah',
      urgent: false,
      read: true
    }
  ]);

  const [familyTasks] = useState<FamilyTask[]>([
    {
      id: '1',
      title: 'Buy Christmas tree',
      assignedTo: 'Mike',
      dueDate: '2024-12-20',
      status: 'in-progress',
      priority: 'high',
      category: 'Decorations'
    },
    {
      id: '2',
      title: 'Wrap remaining presents',
      assignedTo: 'Sarah',
      dueDate: '2024-12-22',
      status: 'pending',
      priority: 'high',
      category: 'Gifts'
    },
    {
      id: '3',
      title: 'Bake Christmas cookies',
      assignedTo: 'Emma',
      dueDate: '2024-12-21',
      status: 'pending',
      priority: 'medium',
      category: 'Cooking'
    },
    {
      id: '4',
      title: 'Clean living room for guests',
      assignedTo: 'Jake',
      dueDate: '2024-12-23',
      status: 'pending',
      priority: 'medium',
      category: 'Cleaning'
    },
    {
      id: '5',
      title: 'Set up dining table',
      assignedTo: 'Sarah',
      dueDate: '2024-12-24',
      status: 'pending',
      priority: 'low',
      category: 'Setup'
    }
  ]);

  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const taskStatusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-[#9333EA] to-[#0F73FF] rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Family Coordination Hub</h1>
                  <p className="text-gray-600 text-sm">Shared notifications & updates for seamless holiday planning</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-[#9333EA] border-[#9333EA]">
                {unreadNotifications} unread
              </Badge>
              <Button size="sm" className="bg-[#9333EA] hover:bg-[#7C2D8F] text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Family Members Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h2>
              
              <div className="space-y-4">
                {familyMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {member.avatar}
                      </div>
                      <div 
                        className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[member.status]} rounded-full border-2 border-white`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{member.tasks} tasks</span>
                        {member.notifications > 0 && (
                          <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                            {member.notifications}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'notifications' 
                      ? 'bg-white text-[#9333EA] shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <Badge className="bg-[#F05959] text-white text-xs px-1.5 py-0 h-5">
                      {unreadNotifications}
                    </Badge>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'tasks' 
                      ? 'bg-white text-[#9333EA] shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Family Tasks
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-white text-[#9333EA] shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Messages
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                        notification.read 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-white border-[#9333EA]/20 hover:border-[#9333EA]/40'
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.urgent ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {notification.type === 'task' && <Check className="w-4 h-4 text-green-600" />}
                          {notification.type === 'reminder' && <Clock className="w-4 h-4 text-orange-600" />}
                          {notification.type === 'request' && <AlertCircle className="w-4 h-4 text-blue-600" />}
                          {notification.type === 'update' && <Bell className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              {notification.urgent && (
                                <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                              )}
                              <span className="text-sm text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">From: {notification.from}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#9333EA] rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-4">
                  {familyTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl border border-gray-200 hover:border-[#9333EA]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[task.priority]} variant="outline">
                            {task.priority}
                          </Badge>
                          <Badge className={taskStatusColors[task.status]} variant="outline">
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>Assigned to: <strong>{task.assignedTo}</strong></span>
                          <span>Category: {task.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Family Chat Coming Soon</h3>
                  <p className="text-gray-600 mb-6">Real-time messaging for quick family coordination</p>
                  <Button className="bg-[#9333EA] hover:bg-[#7C2D8F] text-white">
                    Join Beta
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
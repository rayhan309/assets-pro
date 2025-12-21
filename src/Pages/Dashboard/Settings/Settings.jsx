import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell,  Palette, 
  Globe, CreditCard, ChevronRight, Camera, 
  ShieldAlert
} from 'lucide-react';
import useUserRole from '../../../Hooks/useUserRole';
import SecuritySettings from './Security/Security';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const {userInfo} = useUserRole();

  const menuItems = [
    { id: 'profile', label: 'Account', icon: <User size={18} />, color: 'bg-blue-500' },
    { id: 'security', label: 'Security', icon: <ShieldAlert size={18} />, color: 'bg-purple-500' },
    { id: 'notifs', label: 'Notifications', icon: <Bell size={18} />, color: 'bg-yellow-500' },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} />, color: 'bg-pink-500' },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} />, color: 'bg-emerald-500' },
  ];


  console.log(activeTab)

  return (
    <div className="min-h-screen p-2 md:p-8 font-sans">
      <div className="md:mx-14 mx-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="bg-base-100/20 rounded-3xl p-6 shadow-sm border border-base-300">
            <div className="flex items-center gap-4 mb-8 px-2">
              <div className="avatar online">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={userInfo.photo || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} alt="user" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg">{userInfo.name}</h2>
                <p className="text-xs opacity-50"> {userInfo.role === "HR_MANAGER" ? "Pro Account" : "Basic Account"}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                    activeTab === item.id 
                    ? 'bg-primary text-primary-content shadow-lg shadow-primary/30' 
                    : 'hover:bg-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${activeTab === item.id ? 'bg-white/20' : 'bg-base-200'}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-base-100/40 rounded-3xl shadow-sm border border-base-300 overflow-hidden"
            >
              {/* Profile Section Content */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <div className="flex flex-wrap gap-4 justify-between items-start mb-8">
                    <div>
                      <span className="text-2xl font-bold my-text">Profile Settings</span>
                      <p className="text-sm text-secondary opacity-60">Update your personal information and public profile.</p>
                    </div>
                    <button className="btn btn-primary btn-sm rounded-xl px-6">Save Changes</button>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-6 p-4 bg-base-200/50 rounded-2xl border border-dashed border-base-300">
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden">
                            <img src={userInfo.photo || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} alt="profile" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                          <Camera size={20} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Profile Picture</h4>
                        <p className="text-xs opacity-50 mb-2">PNG, JPG max 5MB</p>
                        <div className="flex gap-2">
                           <button className="btn btn-xs btn-outline">Upload</button>
                           <button className="btn btn-xs btn-ghost text-error">Remove</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                        <br />
                        <input type="text" className="input input-bordered bg-base-200/30 focus:border-primary" defaultValue={userInfo.name} />
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <br />
                        <input type="email" className="input input-bordered bg-base-200/30 focus:border-primary" defaultValue={userInfo.email} />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Bio</span></label>
                      <br />
                      <textarea className="textarea textarea-bordered bg-base-200/30 h-24" placeholder="Tell us about yourself..."></textarea>
                    </div>

                    <div className="divider text-xs opacity-40 uppercase tracking-widest">Preferences</div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/30">
                        <div className="flex items-center gap-3">
                          <Globe size={18} className="text-primary" />
                          <div>
                            <p className="text-sm font-medium">Public Profile</p>
                            <p className="text-xs opacity-50">Allow anyone to find your profile</p>
                          </div>
                        </div>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs can be added here with similar structure */}

              {activeTab === 'security' && <div>
                <SecuritySettings />
                </div>}

              {activeTab !== 'profile' && activeTab !== 'security' && (
                <div className="p-20 text-center space-y-4">
                  <div className="loading loading-dots loading-lg text-primary"></div>
                  <p className="opacity-50">The {activeTab} panel is under construction...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Settings;
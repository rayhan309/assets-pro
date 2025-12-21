import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  LogOut, 
  History, 
  AlertTriangle,
  Fingerprint,
  Monitor,
  Smartphone as PhoneIcon
} from 'lucide-react';

const SecuritySettings = () => {
  const [passStrength, setPassStrength] = useState(65); // Dummy percentage

  // Animation variants
  const slideUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={slideUp}
      className="p-1 md:p-4 space-y-8 max-w-5xl mx-auto"
    >
      {/* --- Top Header Card --- */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-primary/20 rounded-2xl">
            <ShieldCheck size={48} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold italic">Security Overview</h2>
            <p className="text-sm opacity-70">
              Your account security is <span className="text-success font-bold">Excellent (85%)</span>. 
              Complete 2FA to reach 100%.
            </p>
            <progress className="progress progress-success w-56 mt-2" value="85" max="100"></progress>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- Password Management --- */}
        <section className="card bg-white/5 border border-base-300 shadow-sm overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg flex items-center gap-2">
              <Key size={20} className="text-secondary" /> Change Password
            </h3>
            <div className="space-y-4 mt-4">
              <div className="form-control">
                <input type="password" placeholder="Current Password" className="input input-bordered bg-base-200/50" />
              </div>
              <div className="form-control">
                <input 
                  type="password" 
                  placeholder="New Password" 
                  className="input input-bordered bg-base-200/50" 
                  onChange={(e) => setPassStrength(e.target.value.length * 10)}
                />
                <div className="flex gap-1 mt-2 px-1">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${passStrength > i*20 ? 'bg-success' : 'bg-base-300'}`} />
                    ))}
                </div>
                <label className="label"><span className="label-text-alt opacity-50">Minimum 8 characters with numbers.</span></label>
              </div>
              <button className="btn bg-linear-to-r from-primary to-secondary btn-block">Update Password</button>
            </div>
          </div>
        </section>

        {/* --- 2-Factor Authentication --- */}
        <section className="card bg-white/5 border border-base-300 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg flex items-center gap-2">
              <Smartphone size={20} className="text-primary" /> Two-Factor (2FA)
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/50 border border-base-300">
                <div className="flex items-center gap-3">
                  <Fingerprint size={24} className="text-primary" />
                  <div>
                    <p className="font-bold text-sm">Authenticator App</p>
                    <p className="text-xs opacity-60">Highly Recommended</p>
                  </div>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/20 border border-base-300">
                <div className="flex items-center gap-3 opacity-50">
                  <PhoneIcon size={24} />
                  <div>
                    <p className="font-bold text-sm">SMS Recovery</p>
                    <p className="text-xs">+1 (•••) •••-4590</p>
                  </div>
                </div>
                <button className="btn btn-ghost btn-xs underline">Change</button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Active Sessions --- */}
        <section className="card bg-white/5 shadow-sm lg:col-span-2">
          <div className="card-body">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h3 className="card-title text-lg flex items-center gap-2">
                <History size={20} className="text-accent" /> Active Sessions
              </h3>
              <button className="btn btn-outline btn-error btn-sm">Log out all devices</button>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="border-base-300">
                    <th>Device</th>
                    <th>Location</th>
                    <th>Last Activity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-primary" />
                        <div>
                          <div className="font-bold">MacBook Pro 16"</div>
                          <div className="text-xs opacity-50">Chrome • macOS</div>
                        </div>
                      </div>
                    </td>
                    <td>New York, USA</td>
                    <td><div className="badge badge-success badge-outline badge-sm">Active Now</div></td>
                    <td className="text-right"><button className="btn btn-ghost btn-xs">This Device</button></td>
                  </tr>
                  <tr className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <PhoneIcon size={18} />
                        <div>
                          <div className="font-bold">iPhone 15 Pro</div>
                          <div className="text-xs opacity-50">iOS App</div>
                        </div>
                      </div>
                    </td>
                    <td>London, UK</td>
                    <td className="text-sm opacity-60">2 hours ago</td>
                    <td className="text-right"><button className="btn btn-ghost btn-xs text-error"><LogOut size={14}/></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- Danger Zone --- */}
        <section className="card border-2 border-error/20 bg-error/5 lg:col-span-2">
          <div className="card-body flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
               <AlertTriangle className="text-error" size={32} />
               <div>
                 <h3 className="font-bold text-error">Deactivate Account</h3>
                 <p className="text-sm opacity-70">Once you delete your account, there is no going back. Please be certain.</p>
               </div>
            </div>
            <button className="btn btn-error">Delete Account</button>
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default SecuritySettings;
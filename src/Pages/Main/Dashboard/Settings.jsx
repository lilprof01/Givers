import { useState } from "react";
import { Bell, Globe, Lock, Palette, Shield, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useDarkMode } from "../../../Context/themeContext";
import ToggleSwitch from "../../../Components/Ui/toggleSwitch";

const SettingsPage = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    publicProfile: true,
    language: "English",
    timezone: "UTC-5",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    toast("Your preferences have been updated successfully.");
  };

  return (
    <div className="p-6 space-y-6 pt-22 sm:pt-0 sm:mt-0 sm:overflow-y-scroll">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="space-y-2 text-gray-900 dark:text-gray-200">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="opacity-70">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="grid gap-6 w-full">
        {/* Account Settings */}
        <div className="shadow-sm border-gray-100 p-6 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <div className="text-xl sm:text-2xl font-semibold">Account Settings</div>
            </div>
            <div className="opacity-70">
              Update your personal information and account details.
            </div>
          </div>
          <div className="space-y-4 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="display-name">Display Name</label>
                <input id="display-name" className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" defaultValue="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bio">Bio</label>
              <input id="bio" placeholder="Tell others about yourself..." className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="shadow-sm border-gray-100 p-6 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <div className="text-xl sm:text-2xl font-semibold">Privacy & Security</div>
            </div>
            <div className="opacity-70">
              Control your privacy settings and account security.
            </div>
          </div>
          <div className="space-y-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Public Profile</label>
                <p className="text-sm text-gray-500">Allow others to view your profile</p>
              </div>
              <ToggleSwitch
                isOn={settings.publicProfile}
                onToggle={() => handleToggle("publicProfile")}
              />
            </div>
            <hr className="text-gray-400" />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Password & Authentication</h4>
              <div className="space-y-3">
                <button className="w-full justify-start flex items-center gap-4 border border-gray-300 dark:border-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-400/20 transition-all duration-300">
                  <Lock className="w-5 h-5 mr-2" strokeWidth={1} />
                  Change Password
                </button>
                <button className="w-full justify-start flex items-center gap-4 border border-gray-300 dark:border-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-400/20 transition-all duration-300">
                  <Shield className="w-5 h-5 mr-2" strokeWidth={1} />
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="shadow-sm border-gray-100 p-6 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <div className="text-xl sm:text-2xl font-semibold">Notifications</div>
            </div>
            <div className="opacity-70">
              Choose what notifications you want to receive.
            </div>
          </div>
          <div className="space-y-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Email Notifications</label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <ToggleSwitch
                isOn={settings.emailNotifications}
                onToggle={() => handleToggle("emailNotifications")}
              />
            </div>
            <hr className="text-gray-400" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Push Notifications</label>
                <p className="text-sm text-gray-500">Receive browser notifications</p>
              </div>
              <ToggleSwitch
                isOn={settings.pushNotifications}
                onToggle={() => handleToggle("pushNotifications")}
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="shadow-sm border-gray-100 p-6 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <div className="text-xl sm:text-2xl font-semibold">Appearance</div>
            </div>
            <div>Customize how the application looks and feels.</div>
          </div>
          <div className="space-y-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Dark Mode</label>
                <p className="text-sm text-gray-500">Use dark theme across the application</p>
              </div>
              <ToggleSwitch
                isOn={darkMode}
                onToggle={() => setDarkMode((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="shadow-sm border-gray-100 p-6 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-500" />
              <div className="text-xl">Language & Region</div>
            </div>
            <div>Set your language preferences and regional settings.</div>
          </div>
          <div className="space-y-4 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="language">Language</label>
                <select className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 dark:*:bg-black">
                  <option disabled>select language</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>German</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="timezone">Timezone</label>
                <select className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 dark:*:bg-black">
                  <option disabled>select timezone</option>
                  <option>UTC+01:00 (WAT)</option>
                  <option>UTC−08:00 (PT)</option>
                  <option>UTC+00:00 (GMT)</option>
                  <option>UTC−06:00 (CT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

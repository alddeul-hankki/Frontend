// src/components/NotificationSettings/NotificationSettings.jsx
import React, { useState, useEffect } from 'react';
import { updateNotificationSettings } from '../../util/api';
import './NotificationSettings.module.css';

export const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    orderNotifications: true,
    promotionNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true
  });

  const handleSettingChange = async (key, value) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      
      await updateNotificationSettings(newSettings);
      console.log('알림 설정이 업데이트되었습니다');
    } catch (error) {
      console.error('설정 업데이트 실패:', error);
      // 원래 값으로 되돌리기
      setSettings(settings);
    }
  };

  return (
    <div className="notification-settings">
      <h3>알림 설정</h3>
      
      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.orderNotifications}
            onChange={(e) => handleSettingChange('orderNotifications', e.target.checked)}
          />
          주문 관련 알림
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.promotionNotifications}
            onChange={(e) => handleSettingChange('promotionNotifications', e.target.checked)}
          />
          프로모션 알림
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
          />
          알림음
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.vibrationEnabled}
            onChange={(e) => handleSettingChange('vibrationEnabled', e.target.checked)}
          />
          진동
        </label>
      </div>
    </div>
  );
};
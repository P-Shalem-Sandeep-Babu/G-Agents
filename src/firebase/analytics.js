import { getAnalytics, logEvent } from 'firebase/analytics';
import app from './config';

const analytics = getAnalytics(app);

export const trackEvent = (eventName, params = {}) => {
  if (process.env.NODE_ENV === 'production') {
    logEvent(analytics, eventName, params);
  } else {
    console.log(`[Analytics] ${eventName}`, params);
  }
};

// Common events
export const EVENTS = {
  CONTENT_GENERATED: 'content_generated',
  WORKSHEET_CREATED: 'worksheet_created'
};
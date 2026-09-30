'use client';

import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AnalyticsModal({ linkId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const result = await api.getAnalytics(linkId);
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };

    if (linkId) {
      fetchAnalytics();
    }
  }, [linkId]);

  const clicks = data?.clicks || [];
  const totalClicks = data?.totalClicks || clicks.length;

  const browsers = {};
  const operatingSystems = {};
  const referrers = {};

  clicks.forEach((c) => {
    const b = c.browser || 'Unknown';
    const o = c.os || 'Unknown';
    const r = c.referrer || 'Direct';

    browsers[b] = (browsers[b] || 0) + 1;
    operatingSystems[o] = (operatingSystems[o] || 0) + 1;
    referrers[r] = (referrers[r] || 0) + 1;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Link Analytics</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {data?.link?.title || `/${data?.link?.shortCode || ''}`}
            </span>
          </div>
          <button onClick={onClose} className="btn-icon">✕</button>
        </div>

        
        <div className="modal-body">
          {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading analytics...</p>}
          {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center' }}>⚠️ {error}</p>}

          {!loading && !error && data && (
            <>
              <div className="analytics-stat-row">
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Total Clicks</div>
                  <div className="analytics-stat-val">{totalClicks}</div>
                </div>
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Top Browser</div>
                  <div className="analytics-stat-val" style={{ fontSize: '13px' }}>
                    {Object.keys(browsers)[0] || 'None'}
                  </div>
                </div>
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Top OS</div>
                  <div className="analytics-stat-val" style={{ fontSize: '13px' }}>
                    {Object.keys(operatingSystems)[0] || 'None'}
                  </div>
                </div>
              </div>

              <div className="analytics-section-title">Browsers</div>
              {Object.keys(browsers).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(browsers).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} ({Math.round((count / (totalClicks || 1)) * 100)}%)
                    </span>
                  </div>
                ))
              )}

              <div className="analytics-section-title">Operating Systems</div>
              {Object.keys(operatingSystems).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(operatingSystems).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} ({Math.round((count / (totalClicks || 1)) * 100)}%)
                    </span>
                  </div>
                ))
              )}

           
              <div className="analytics-section-title">Referrer Sources</div>
              {Object.keys(referrers).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(referrers).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} clicks
                    </span>
                  </div>
                ))
              )}

             
              <div className="analytics-section-title">Recent Clicks (Last 10)</div>
              {clicks.length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No clicks recorded yet.</p>
              ) : (
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clicks.slice(0, 10).map((click) => (
                      <tr key={click.id}>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>
                          {new Date(click.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td>{click.browser || 'Unknown'}</td>
                        <td>{click.os || 'Unknown'}</td>
                        <td>{click.referrer || 'Direct'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { api } from '../services/api';


export default function LinkCard({ link, onLinkDeleted, onOpenAnalytics, showToast }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  
  const shortUrl = api.getShortUrl(link.shortCode);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy link');
    }
  };

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Delete short link "/${link.shortCode}"?`);
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await api.deleteLink(link.id);
      onLinkDeleted(link.id);
      showToast('Link deleted');
    } catch (error) {
      showToast(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="link-row">
      <div className="link-info">
       
        <div className="link-top">
          <span className="link-title">{link.title || link.shortCode}</span>
          <span className="click-badge">
            {link.totalClicks || 0} {link.totalClicks === 1 ? 'click' : 'clicks'}
          </span>
        </div>

        <div className="link-urls">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="short-url"
            title="Open short link in new tab"
          >
            {shortUrl.replace(/^https?:\/\//, '')} ↗
          </a>
          <span className="destination-url" title={link.originalUrl}>
            ↳ {link.originalUrl}
          </span>
        </div>
      </div>
      <div className="link-actions">
      
        <button onClick={handleCopy} className="btn btn-secondary btn-sm">
          {copied ? '✓ Copied' : 'Copy'}
        </button>

  
        <button
          onClick={() => onOpenAnalytics(link.id)}
          className="btn btn-secondary btn-sm"
        >
          Analytics
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          disabled={deleting}
        >
          {deleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
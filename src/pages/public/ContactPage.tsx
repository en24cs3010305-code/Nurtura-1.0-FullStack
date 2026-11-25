import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          We’d Love to Hear From You
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300 max-w-lg mx-auto">
          Have questions about clinical onboarding, feedback, or family sharing? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <Card className="md:col-span-2 space-y-6 bg-sage-800 text-white border-0">
          <div>
            <h3 className="text-lg font-heading font-bold">Contact Details</h3>
            <p className="text-xs text-sage-200 mt-1">Our support team responds within 24 hours.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-peach-300 shrink-0" />
              <span>support@nurturacare.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-peach-300 shrink-0" />
              <span>+1 (800) 555-CARE (2273)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-peach-300 shrink-0" />
              <span>Medical Plaza Suite 500, San Francisco, CA</span>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-3">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-heading font-bold">Message Received!</h4>
              <p className="text-xs text-nurturaText-secondary">
                Thank you for contacting Nurtura. A representative will get back to you shortly.
              </p>
              <Button size="sm" variant="soft" onClick={() => setSubmitted(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-nurturaText-secondary dark:text-sage-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with Nurtura?"
                  className="w-full bg-white dark:bg-darkBg-card border border-stone-200 dark:border-darkBg-border rounded-xl text-sm text-nurturaText-primary dark:text-cream-100 placeholder:text-stone-400 py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-600"
                />
              </div>
              <Button type="submit" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                Send Inquiries
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

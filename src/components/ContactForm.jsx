import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const enquiryTypes = ['General enquiry', 'Collaboration', 'Sponsorship', 'Event question'];

const empty = { name: '', email: '', type: enquiryTypes[0], subject: '', message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn’t look right.';
  if (!v.subject.trim()) e.subject = 'Add a short subject.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  return e;
}

/**
 * Sends to `siteConfig.contact.formEndpoint` (e.g. Formspree) when configured.
 * Otherwise it opens the visitor's email app with the message pre-filled —
 * it never claims to have sent anything it didn't.
 */
async function submitContact(values) {
  const { formEndpoint, email } = siteConfig.contact;
  if (formEndpoint) {
    const res = await fetch(formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error('Request failed');
    return 'sent';
  }
  const subject = `[${values.type}] ${values.subject}`;
  const body = `${values.message}\n\n— ${values.name} (${values.email})`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-1.5 text-sm text-g-red-ink"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-paper/60 px-4 py-3 text-ink placeholder:text-muted/70 transition-colors duration-200 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/30 ${
    err ? 'border-g-red' : 'border-line focus:border-accent'
  }`;

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus('sending');
    try {
      const result = await submitContact(values);
      setStatus(result);
      if (result === 'sent') {
        setValues(empty);
        setTouched({});
      }
    } catch {
      setStatus('error');
    }
  };

  const err = (k) => (touched[k] ? errors[k] : undefined);
  const aria = (k) => ({ 'aria-invalid': !!err(k), 'aria-describedby': err(k) ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <fieldset>
        <legend className="label text-muted">What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {enquiryTypes.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40 ${
                values.type === t ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line text-muted hover:text-ink'
              }`}
            >
              <input type="radio" name="type" value={t} checked={values.type === t} onChange={set('type')} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={err('name')}>
          <input id="name" autoComplete="name" value={values.name} onChange={set('name')} onBlur={blur('name')} className={inputCls(err('name'))} {...aria('name')} />
        </Field>
        <Field id="email" label="Email" error={err('email')}>
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email')} className={inputCls(err('email'))} {...aria('email')} />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="subject" label="Subject" error={err('subject')}>
          <input id="subject" value={values.subject} onChange={set('subject')} onBlur={blur('subject')} className={inputCls(err('subject'))} {...aria('subject')} />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="message" label="Message" error={err('message')}>
          <textarea id="message" rows={5} value={values.message} onChange={set('message')} onBlur={blur('message')} className={`${inputCls(err('message'))} resize-y`} {...aria('message')} />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors duration-300 hover:bg-accent-ink disabled:opacity-60"
        >
          {status === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />}
          {siteConfig.contact.formEndpoint ? 'Send message' : 'Continue in email app'}
        </motion.button>
        {!siteConfig.contact.formEndpoint && (
          <p className="text-sm text-muted">Opens your email app with this message filled in.</p>
        )}
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <Notice key="sent" tone="ok" text="Thanks — your message was sent. We’ll get back to you soon." />
          )}
          {status === 'mailto' && (
            <Notice key="mailto" tone="ok" text={`Your email app should have opened with the message ready. If it didn’t, write to ${siteConfig.contact.email}.`} />
          )}
          {status === 'error' && (
            <Notice key="error" tone="error" text={`Something went wrong sending your message. Please email ${siteConfig.contact.email} instead.`} />
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Notice({ tone, text }) {
  const ok = tone === 'ok';
  const Icon = ok ? CheckCircle2 : AlertCircle;
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`mt-6 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${ok ? 'bg-accent-soft text-accent-ink' : 'bg-[#FBE6E2] text-g-red-ink'}`}
    >
      <Icon size={17} className="mt-px shrink-0" /> {text}
    </motion.p>
  );
}

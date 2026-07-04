import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import personalInfo from '@/data/personalInfo';
import { sendMessage } from '@/services/contactService';
import type { ContactFormValues } from '@/types';

const initialForm: ContactFormValues = { name: '', email: '', message: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<ContactFormValues>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg((err as Error).message);
    }
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` },
    ...(personalInfo.whatsapp
      ? [
          {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: personalInfo.whatsapp,
            href: `https://wa.me/${personalInfo.whatsapp.replace(/[^\d]/g, '')}`,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-navy-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project, a role, or just a question? I read every message."
          tone="dark"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {contactMethods.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label === 'WhatsApp' ? '_blank' : undefined}
                rel={label === 'WhatsApp' ? 'noreferrer noopener' : undefined}
                className="flex items-center gap-4 border border-line-dark bg-navy-800/40 p-4 transition-colors hover:border-amber"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-800 text-amber">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-paper/40">
                    {label}
                  </span>
                  <span className="block text-sm text-paper/90">{value}</span>
                </span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/50">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-line-dark bg-navy-950/40 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/50">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-line-dark bg-navy-950/40 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber focus:outline-none"
                  placeholder="mail@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/50">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none border border-line-dark bg-navy-950/40 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber focus:outline-none"
                placeholder="Tell me a bit about what you're building…"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" variant="primary" disabled={status === 'sending'}>
                <Send size={16} />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>
              {status === 'success' && (
                <span className="font-mono text-xs text-teal">Thanks — I&rsquo;ll reply soon.</span>
              )}
              {status === 'error' && (
                <span className="font-mono text-xs text-amber">{errorMsg || 'Something went wrong.'}</span>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

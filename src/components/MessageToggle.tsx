import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const MessageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate required fields
    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('https://formsubmit.co/liblissz3@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error('Failed to send message. Try again later.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-large bg-cta hover:bg-cta/90 text-cta-foreground"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 shadow-large animate-slide-up">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Send us a message</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-light"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New message from your website" />
                <Input name="name" placeholder="Your name" className="h-9" />
                <Input name="email" type="email" placeholder="Your email" className="h-9" />
                <Textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="resize-none"
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default MessageToggle;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Video, Star, Calendar as CalendarIcon, CreditCard, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const experts = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Nutritionist",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    specialization: ["Weight Management", "Diabetes Care", "Sports Nutrition"],
    price: 1500,
    image: "/placeholder.svg",
    nextAvailable: "Today, 2:00 PM",
    languages: ["Hindi", "English"]
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    title: "Registered Dietitian",
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    specialization: ["Heart Health", "PCOS Management", "Child Nutrition"],
    price: 1200,
    image: "/placeholder.svg",
    nextAvailable: "Tomorrow, 10:00 AM",
    languages: ["Hindi", "English", "Tamil"]
  },
  {
    id: 3,
    name: "Dr. Sunita Patel",
    title: "Sports Nutritionist",
    experience: "15 years",
    rating: 4.9,
    reviews: 203,
    specialization: ["Athletic Performance", "Muscle Building", "Recovery Nutrition"],
    price: 2000,
    image: "/placeholder.svg",
    nextAvailable: "Today, 4:30 PM",
    languages: ["Hindi", "English", "Gujarati"]
  }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM"
];

const ConsultationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'video' | 'chat'>('video');
  const [isBooking, setIsBooking] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBookConsultation = async () => {
    if (!selectedExpert || !selectedDate || !selectedTime) {
      toast.error('Please select all required fields');
      return;
    }

    if (!user) {
      toast.error('Please sign in to book a consultation');
      return;
    }

    setIsBooking(true);

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        toast.error('Payment gateway failed to load. Please try again.');
        setIsBooking(false);
        return;
      }

      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: selectedExpert.price * 100, // Amount in paise
        currency: 'INR',
        name: 'NutriExpert',
        description: `Consultation with ${selectedExpert.name}`,
        image: '/placeholder.svg',
        handler: async function (response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Send confirmation emails (simulated)
          const appointmentDetails = {
            expert: selectedExpert.name,
            date: selectedDate.toLocaleDateString('en-IN'),
            time: selectedTime,
            type: consultationType,
            amount: selectedExpert.price,
            paymentId: response.razorpay_payment_id
          };

          // Simulate sending emails
          setTimeout(() => {
            toast.success(`Consultation booked successfully! 
              📧 Confirmation emails sent to ${user.email} and ${selectedExpert.name.toLowerCase().replace(' ', '.')}@nutriexpert.com
              💳 Payment ID: ${response.razorpay_payment_id}`);
            
            // Navigate to dashboard or confirmation page
            navigate('/dashboard');
          }, 1000);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '9999999999'
        },
        notes: {
          consultation_date: selectedDate.toISOString(),
          consultation_time: selectedTime,
          expert_id: selectedExpert.id,
          consultation_type: consultationType
        },
        theme: {
          color: '#10B981'
        },
        modal: {
          ondismiss: function() {
            setIsBooking(false);
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setIsBooking(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to book a consultation with our nutrition experts.
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Consultation</h1>
          <p className="text-gray-600">Connect with certified nutrition experts for personalized guidance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Expert Selection */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Choose Your Expert</h2>
            {experts.map((expert) => (
              <Card 
                key={expert.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedExpert?.id === expert.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                }`}
                onClick={() => setSelectedExpert(expert)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={expert.image} alt={expert.name} />
                      <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{expert.name}</h3>
                          <p className="text-gray-600">{expert.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">₹{expert.price}</div>
                          <div className="text-sm text-gray-500">per session</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{expert.rating}</span>
                          <span className="text-gray-500">({expert.reviews} reviews)</span>
                        </div>
                        <Badge variant="outline">{expert.experience} experience</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {expert.specialization.map((spec, index) => (
                            <Badge key={index} variant="secondary">{spec}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Next available: {expert.nextAvailable}</span>
                        </div>
                        <div>Languages: {expert.languages.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedExpert && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium">{selectedExpert.name}</div>
                    <div className="text-sm text-gray-600">{selectedExpert.title}</div>
                    <div className="font-bold text-green-600 mt-1">₹{selectedExpert.price}</div>
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium mb-3 block">Consultation Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={consultationType === 'video' ? 'default' : 'outline'}
                      onClick={() => setConsultationType('video')}
                      className="flex items-center gap-2"
                    >
                      <Video className="h-4 w-4" />
                      Video Call
                    </Button>
                    <Button
                      variant={consultationType === 'chat' ? 'default' : 'outline'}
                      onClick={() => setConsultationType('chat')}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Chat Only
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Available Time Slots</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  onClick={handleBookConsultation}
                  disabled={!selectedExpert || !selectedDate || !selectedTime || isBooking}
                >
                  <CreditCard className="h-4 w-4" />
                  {isBooking ? 'Processing...' : `Pay ₹${selectedExpert?.price || 0} & Book Now`}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Secure payment powered by Razorpay
                  <br />
                  Confirmation emails will be sent to both parties
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;

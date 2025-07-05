
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Star, CreditCard, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Expert {
  id: string;
  name: string;
  credentials: string;
  specialization: string;
  rating: number;
  experience: string;
  price: number;
  availableSlots: string[];
  image: string;
  email: string;
}

const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    credentials: 'MD, Registered Dietitian',
    specialization: 'Weight Management & Metabolic Health',
    rating: 4.9,
    experience: '15+ years',
    price: 2500, // ₹2500 instead of $150
    availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
    image: 'photo-1582562124811-c09040d0a901',
    email: 'dr.sarah@nutrition.com'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    credentials: 'PhD Nutrition Science, RD',
    specialization: 'Sports Nutrition & Performance',
    rating: 4.8,
    experience: '12+ years',
    price: 2000, // ₹2000 instead of $120
    availableSlots: ['9:00 AM', '1:00 PM', '5:00 PM'],
    image: 'photo-1506744038136-46273834b3fb',
    email: 'dr.chen@nutrition.com'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    credentials: 'MD, Clinical Nutritionist',
    specialization: 'Chronic Disease Management',
    rating: 4.9,
    experience: '18+ years',
    price: 3000, // ₹3000 instead of $180
    availableSlots: ['11:00 AM', '3:00 PM', '6:00 PM'],
    image: 'photo-1501854140801-50d01698950b',
    email: 'dr.rodriguez@nutrition.com'
  }
];

const Consultation: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();

  const handleBookConsultation = async () => {
    if (!selectedExpert || !selectedSlot) {
      toast.error('Please select an expert and time slot');
      return;
    }

    if (!user) {
      toast.error('Please login to book consultation');
      return;
    }

    setIsBooking(true);
    
    try {
      // Simulate payment gateway integration (Razorpay/Paytm)
      const paymentData = {
        amount: selectedExpert.price * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          expertId: selectedExpert.id,
          timeSlot: selectedSlot,
          userEmail: user.email,
          userName: user.name
        }
      };

      // In real implementation, this would redirect to payment gateway
      console.log('Redirecting to payment gateway with data:', paymentData);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send confirmation emails
      await sendConfirmationEmails(selectedExpert, selectedSlot, user);
      
      toast.success(`Consultation booked with ${selectedExpert.name} at ${selectedSlot}. Payment of ₹${selectedExpert.price} processed successfully! Confirmation emails sent.`);
      
      // Reset selection
      setSelectedExpert(null);
      setSelectedSlot('');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const sendConfirmationEmails = async (expert: Expert, timeSlot: string, user: any) => {
    // Simulate sending emails to both doctor and patient
    const appointmentDetails = {
      doctorEmail: expert.email,
      patientEmail: user.email,
      appointmentTime: timeSlot,
      appointmentDate: new Date().toDateString(),
      meetingLink: `https://meet.google.com/appointment-${Date.now()}`,
      doctorName: expert.name,
      patientName: user.name,
      specialization: expert.specialization,
      amount: expert.price
    };

    console.log('Sending confirmation emails:', appointmentDetails);
    
    // In real implementation, this would trigger actual email service
    return true;
  };

  const handlePaymentRedirect = () => {
    if (!selectedExpert || !selectedSlot || !user) return;

    // Simulate Razorpay payment gateway
    const options = {
      key: 'rzp_test_xxxxxxxxxxxxxx', // Replace with actual Razorpay key
      amount: selectedExpert.price * 100, // Amount in paise
      currency: 'INR',
      name: 'NutriCare Consultations',
      description: `Consultation with ${selectedExpert.name}`,
      image: '/logo.png',
      order_id: `order_${Date.now()}`,
      handler: function(response: any) {
        console.log('Payment successful:', response);
        sendConfirmationEmails(selectedExpert, selectedSlot, user);
        toast.success('Payment successful! Confirmation emails sent.');
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9999999999'
      },
      notes: {
        expertId: selectedExpert.id,
        timeSlot: selectedSlot
      },
      theme: {
        color: '#3399cc'
      }
    };

    // In real implementation, you would load Razorpay script and open payment modal
    console.log('Would open Razorpay with options:', options);
    toast.info('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Expert Consultations</h1>
          <p className="text-xl text-gray-600">
            Book a personalized video consultation with our certified nutrition experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Choose Your Expert</h2>
            <div className="space-y-4">
              {experts.map((expert) => (
                <Card 
                  key={expert.id} 
                  className={`cursor-pointer transition-all ${
                    selectedExpert?.id === expert.id 
                      ? 'ring-2 ring-green-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedExpert(expert)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={`https://images.unsplash.com/${expert.image}?auto=format&fit=crop&w=100&h=100`}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{expert.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{expert.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 mb-1">{expert.credentials}</p>
                        <p className="text-sm text-gray-600 mb-2">{expert.specialization}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{expert.experience}</Badge>
                          <span className="text-lg font-bold text-green-600">₹{expert.price.toLocaleString('en-IN')}/session</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Your Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedExpert ? (
                  <>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={`https://images.unsplash.com/${selectedExpert.image}?auto=format&fit=crop&w=50&h=50`}
                          alt={selectedExpert.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{selectedExpert.name}</h4>
                          <p className="text-sm text-gray-600">{selectedExpert.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Session Duration: 45 minutes</span>
                        <span className="font-bold text-green-600">₹{selectedExpert.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Available Time Slots (Today)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedExpert.availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSlot(slot)}
                            className="flex items-center gap-2"
                          >
                            <Clock className="h-4 w-4" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Secure HD video consultation
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        45-minute personalized session
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email confirmations sent to both parties
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Secure payment via Razorpay/UPI
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      onClick={handleBookConsultation}
                      disabled={!selectedSlot || isBooking || !user}
                    >
                      {isBooking ? 'Processing...' : `Book & Pay ₹${selectedExpert.price.toLocaleString('en-IN')}`}
                    </Button>

                    {!user && (
                      <p className="text-sm text-red-600 text-center">
                        Please login to book consultation
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select an expert to view available time slots</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-500" />
                Emergency Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">
                    Need urgent nutrition advice? Our emergency consultation service is available 24/7.
                  </p>
                  <p className="text-sm text-red-600 font-medium">
                    Emergency Rate: ₹5,000 for immediate consultation
                  </p>
                </div>
                <Button variant="destructive" size="lg">
                  Emergency Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What happens after booking?</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>1. Instant payment confirmation via email & SMS</p>
            <p>2. Meeting link sent to both you and your expert</p>
            <p>3. Reminder notifications 24hrs & 1hr before appointment</p>
            <p>4. Post-consultation summary and recommendations via email</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, whatsapp_number, occasion_type, location, notes } = body;

        // Validate required fields
        if (!name || !whatsapp_number || !occasion_type || !location) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_APP_PASSWORD;

        if (!user || !pass) {
            console.error('Missing GMAIL configuration');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });

        const mailOptions = {
            from: `"Diffindo Booking" <${user}>`,
            to: 'hello.diffindo@gmail.com',
            subject: `New Booking: ${occasion_type} from ${name}`,
            text: `
New Booking Request

Name: ${name}
WhatsApp: ${whatsapp_number}
Occasion: ${occasion_type}
Location: ${location}

Additional Notes:
${notes || 'None'}
            `,
            html: `
<h2>New Booking Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp_number.replace(/[^0-9]/g, '')}">${whatsapp_number}</a></p>
<p><strong>Occasion:</strong> ${occasion_type}</p>
<p><strong>Location:</strong> ${location}</p>
<br/>
<p><strong>Additional Notes:</strong></p>
<p>${notes ? notes.replace(/\n/g, '<br/>') : 'None'}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}

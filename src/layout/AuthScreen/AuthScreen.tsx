import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { ChatScreen } from "../ChatScreen";
import { Form, Input, Button, Spin, Typography, Select } from "antd";
import { toast } from "react-toastify";
import "antd/dist/reset.css";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

export const AuthScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isSignedUp, signIn, signUp } = useAuthStore();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<
    { phonecode: string; name: string; isoCode: string; flag: any }[]
  >([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const formattedCountries = allCountries.map((c) => ({
      name: c.name,
      phonecode: c.phonecode,
      isoCode: c.isoCode,
      flag: c.flag,
    }));
    setCountries(formattedCountries);
  }, []);

  if (isAuthenticated) {
    return <ChatScreen />;
  }

  const handleMobileNumberSubmit = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const fullNumber = `${countryCode}-${mobileNumber}`;

    if (isSignedUp) {
      signIn(fullNumber)
        .then(() => {
          navigate("/app");
        })
        .catch((err) => toast.error(err.message));
    } else {
      setShowOtp(true);
      toast.info("OTP sent to your mobile number.");
      toast.dark("Need a hint? Consecutive numbers that sums up to 10");
    }
    setLoading(false);
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter a 4-digit OTP.");
      toast.dark("The otp code is 1234");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const fullNumber = `${countryCode}-${mobileNumber}`;

    if (otp === "1234") {
      signUp(fullNumber)
        .then(() => {
          navigate("/app");
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Invalid OTP. Please try again.");
      toast.dark("The otp code is 1234");
    }
    setLoading(false);
  };

  const prefixSelector = (
    <Select
      value={countryCode}
      onChange={(value) => setCountryCode(value)}
      style={{ width: 100 }}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
      }
    >
      {countries.map((country) => (
        <Option
          key={country.isoCode}
          value={`+${country.phonecode}`}
          label={`${country.isoCode} (+${country.phonecode})`}
        >
          {country.isoCode} (+{country.phonecode})
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Title level={3} className="text-center">
          {showOtp ? "Verify OTP" : "Sign In or Sign Up"}
        </Title>
        <Text type="secondary" className="block text-center mb-4">
          {showOtp
            ? "Enter the OTP sent to your number"
            : "Enter your mobile number to get started"}
        </Text>

        {loading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : showOtp ? (
          <Form onFinish={handleOtpSubmit}>
            <Form.Item>
              <Input
                type="tel"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                placeholder="Enter OTP"
                className="text-center"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Verify & Sign In
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form onFinish={handleMobileNumberSubmit}>
            <Form.Item>
              <Input
                addonBefore={prefixSelector}
                type="number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
                placeholder="Enter your mobile number"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Continue
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

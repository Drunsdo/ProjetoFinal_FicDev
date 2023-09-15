import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { deleteUser, getUser, updateUser } from "../services/user-service";

export function Profile() {
    
}
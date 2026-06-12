'use client'

import React, { useState } from 'react'
import styles from "@/components/my-profile/MyProfileComponent.module.css"
import { FaRegEdit } from "react-icons/fa";

const MyProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
  })
  const [saved, setSaved] = useState(form)

  const handleEdit = () => {
    setSaved({ ...form })
    setIsEditing(true)
  }

  const handleSave = () => {

    setSaved({ ...form })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setForm({ ...saved })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const fields = [
    { id: 'fullName', label: 'Full Name', type: 'text', required: true },
    { id: 'email', label: 'Email ID', type: 'email', required: true },
    { id: 'mobile', label: 'Mobile Number', type: 'tel', required: false },
  ]

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileWrapper}>

        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>My Profile</h1>
          {!isEditing && (
            <button className={styles.btnEdit} onClick={handleEdit}>
              <FaRegEdit />
              Edit Profile
            </button>
          )}
        </div>

        <div className={styles.profileCard}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`${styles.profileField}${index < fields.length - 1 ? ' profile-field--bordered' : ''}`}
            >
              <label htmlFor={field.id} className={styles.fieldLabel}>
                {field.label}
                {field.required && <span className="field-required">*</span>}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={form[field.id] || ''}
                disabled={!isEditing}
                onChange={handleChange}
                className={`${styles.fieldInput}${isEditing ? ' field-input--active' : ''}`}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <div className={styles.profileActions}>
            <button className={styles.btnCancel} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.btnSave} onClick={handleSave}>
              Save changes
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default MyProfileComponent
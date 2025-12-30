import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMsg(null)
    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || null,
          phone: phone.trim() || null,
          source: 'website',
          status: 'new',
          notes: 'website form',
        }),
      })

      const data = await res.json()
      if (!data?.ok) throw new Error(data?.error || 'Lead not saved')

      setMsg('Saved')
      setName('')
      setPhone('')
    } catch (err: any) {
      setMsg(err?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1>Lead Form</h1>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 6 }}
            placeholder="Name"
          />
        </label>

        <label>
          Phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 6 }}
            placeholder="Phone"
          />
        </label>

        <button type="submit" disabled={loading} style={{ padding: 12 }}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  )
}

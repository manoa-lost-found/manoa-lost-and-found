'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Badge, Form, Spinner } from 'react-bootstrap';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type FeedItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  imageUrl?: string | null;
  category: string;
  building: string;
  term: string;
  date: string; // YYYY-MM-DD
  locationName?: string | null;
};

const CATEGORY_OPTIONS = [
  'All Categories',
  'Bottle',
  'Clothing',
  'Electronics',
  'Wallet',
  'Keys',
  'ID',
  'Jewelry',
  'Bag',
  'Misc',
];

const BUILDING_OPTIONS = [
  'All Buildings',
  'Hamilton Library',
  'POST Building',
  'Bilger Hall',
  'Campus Center',
  'Gateway House',
  'Sakamaki Hall',
  'Keller Hall',
  'Sinclair Library',
  'Art Building',
  'BusAd',
  'Paradise Palms',
  'Other',
];

const TYPE_OPTIONS = ['All Items', 'Lost Items', 'Found Items'];

function statusBadge(status: ItemStatus) {
  switch (status) {
    case 'OPEN':
      return { text: 'Open', bg: 'warning' as const };
    case 'TURNED_IN':
      return { text: 'Turned In', bg: 'info' as const };
    case 'WAITING_FOR_PICKUP':
      return { text: 'Waiting for Pickup', bg: 'primary' as const };
    case 'RECOVERED':
      return { text: 'Recovered', bg: 'success' as const };
    default:
      return { text: status, bg: 'secondary' as const };
  }
}

function typeBadge(type: ItemType) {
  return type === 'LOST'
    ? { text: 'Lost', bg: 'danger' as const }
    : { text: 'Found', bg: 'success' as const };
}

export default function LostFoundFeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [buildingFilter, setBuildingFilter] = useState<string>('All Buildings');
  const [typeFilter, setTypeFilter] = useState<string>('All Items');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Load items from the shared API route
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/items');
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        setItems(data.items ?? []);
      } catch (err) {
        console.error(err);
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredItems = useMemo(() => {
    let data = [...items];

    if (categoryFilter !== 'All Categories') {
      data = data.filter((i) => i.category === categoryFilter);
    }

    if (buildingFilter !== 'All Buildings') {
      data = data.filter((i) => i.building === buildingFilter);
    }

    if (typeFilter === 'Lost Items') {
      data = data.filter((i) => i.type === 'LOST');
    } else if (typeFilter === 'Found Items') {
      data = data.filter((i) => i.type === 'FOUND');
    }

    data.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.date.localeCompare(a.date);
      }
      return a.date.localeCompare(b.date);
    });

    return data;
  }, [items, categoryFilter, buildingFilter, typeFilter, sortOrder]);

  const feedContent = (() => {
    if (loading) {
      return (
        <Row>
          <Col>
            <Card body className="text-center shadow-sm">
              <Spinner animation="border" size="sm" className="me-2" />
              <span>Loading items…</span>
            </Card>
          </Col>
        </Row>
      );
    }

    if (error) {
      return (
        <Row>
          <Col>
            <Card body className="text-center shadow-sm border-danger">
              <p className="mb-0 text-danger">{error}</p>
            </Card>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        {filteredItems.length === 0 ? (
          <Col>
            <Card body className="text-center shadow-sm">
              <p className="mb-0">No items have been reported yet. Try changing the filters.</p>
            </Card>
          </Col>
        ) : (
          filteredItems.map((item) => {
            const s = statusBadge(item.status);
            const t = typeBadge(item.type);
            return (
              <Col key={item.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm rounded-3">
                  {item.imageUrl && (
                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                  )}
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Badge bg={t.bg}>{t.text}</Badge>
                      <Badge bg={s.bg}>{s.text}</Badge>
                    </div>

                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="small text-muted mb-2">
                      {item.building} • {item.term}
                    </Card.Text>
                    <Card.Text style={{ minHeight: '3em' }}>{item.description}</Card.Text>
                    {item.locationName && (
                      <Card.Text className="small mb-0">
                        <strong>Pickup: </strong>
                        {item.locationName}
                      </Card.Text>
                    )}
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link href={`/item/${item.id}`} className="fw-semibold text-decoration-none">
                      View details →
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    );
  })();

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <Container>
        {/* Hero section */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 rounded-4 shadow-sm">
              <Card.Body className="py-4 px-4">
                <p className="text-uppercase text-muted small mb-1">
                  Welcome to Manoa Lost &amp; Found
                </p>
                <h1 className="display-5 fw-bold mb-2">Find it. Report it. Reunite it.</h1>
                <p className="text-muted mb-3">
                  Browse every lost and found item reported across the UH Mānoa campus.
                </p>
                <p className="fw-semibold mb-0">
                  You&apos;re viewing the campus-wide Lost/Found feed.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4 align-items-stretch">
          {/* Item Type */}
          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Item Type</h6>
              <Form.Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          {/* Category */}
          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Category</h6>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          {/* Building */}
          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Building</h6>
              <Form.Select
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
              >
                {BUILDING_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          {/* Sort */}
          <Col md={3}>
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Sort</h6>
              <Form.Select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as 'newest' | 'oldest')
                }
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </Form.Select>
            </Card>
          </Col>
        </Row>

        {/* Feed */}
        {feedContent}
      </Container>
    </main>
  );
}

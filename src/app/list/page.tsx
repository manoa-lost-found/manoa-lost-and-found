'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  Spinner,
} from 'react-bootstrap';

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
  date: string;
  locationName?: string | null;
};

// Expanded categories for UH Mānoa Lost & Found
const CATEGORY_OPTIONS = [
  'All',
  'Electronics',
  'Student ID / Cards',
  'Wallet',
  'Keys',
  'Bags / Backpacks',
  'Clothing',
  'Drinkware / Bottles',
  'Books / Notebooks',
  'Tech Accessories',
  'Jewelry / Accessories',
  'Misc',
];

// Expanded building list for UH Mānoa
const BUILDING_OPTIONS = [
  'All',
  // Academic Buildings
  'Hamilton Library',
  'Sinclair Library',
  'Bilger Hall',
  'Bilger Addition (BILG)',
  'Sakamaki Hall',
  'Moore Hall',
  'Kuykendall Hall',
  'Webster Hall',
  'Art Building',
  'Music Building',
  'Hemenway Hall',
  'Saunders Hall',
  'Watanabe Hall',
  'Physical Science Building',
  'Edmondson Hall',
  'Holmes Hall (Engineering)',
  'Dean Hall',
  'Crawford Hall',
  'Henke Hall',
  'Gartley Hall',
  'Miller Hall',
  'Bachman Hall',
  'George Hall',
  'HIG — Hawaiʻi Institute of Geophysics',
  'POST — Physical Science Building Annex (Pearl Harbor Memorial Bldg.)',
  'BUSAD — Shidler College of Business',
  'Hawaii Hall',
  'Queen Liliʻuokalani Center for Student Services (QLC)',
  // Science & Research
  'Biomedical Sciences Building (BIOMED)',
  'Agricultural Sciences (AGSCI)',
  'St. John Plant Science Lab',
  'Kennedy Theater',
  // Athletics / Recreation
  'Warrior Recreation Center (WRC)',
  'Les Murakami Baseball Stadium',
  'Stan Sheriff Center',
  'T.C. Ching Athletic Complex',
  'Dole Street Recreation Center',
  'Andrews Outdoor Theater',
  // Dining / Student Life
  'Campus Center (CC)',
  'Paradise Palms',
  'Gateway Café',
  'Hale Aloha Café',
  // Dorms / Residence Halls
  'Hale Aloha Towers',
  'Gateway House',
  'Johnson Hall',
  'Freenes Hall',
  'Hale Wainani Towers',
  'Hale Kahawai',
  'Hale Laulima',
];

function statusBadge(status: ItemStatus) {
  if (status === 'OPEN') {
    return { text: 'Open', bg: 'warning' as const };
  }
  if (status === 'TURNED_IN') {
    return { text: 'Turned In', bg: 'info' as const };
  }
  if (status === 'WAITING_FOR_PICKUP') {
    return { text: 'Waiting for Pickup', bg: 'primary' as const };
  }
  if (status === 'RECOVERED') {
    return { text: 'Recovered', bg: 'success' as const };
  }
  return { text: status, bg: 'secondary' as const };
}

function typeBadge(type: ItemType) {
  if (type === 'LOST') {
    return { text: 'Lost', bg: 'danger' as const };
  }
  return { text: 'Found', bg: 'success' as const };
}

export default function LostFoundFeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [buildingFilter, setBuildingFilter] = useState<string>('All');
  const [termFilter, setTermFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

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

  // Build term options dynamically from the data (e.g. 'Fall 2025', 'Spring 2026')
  const termOptions = useMemo(() => {
    const set = new Set<string>();

    items.forEach((item) => {
      if (item.term) {
        set.add(item.term);
      }
    });

    const termOrder: Record<string, number> = {
      Spring: 1,
      Summer: 2,
      Fall: 3,
    };

    const base = Array.from(set);

    base.sort((a, b) => {
      const [aSeason, aYearStr] = a.split(' ');
      const [bSeason, bYearStr] = b.split(' ');
      const aYear = Number(aYearStr);
      const bYear = Number(bYearStr);

      if (!Number.isNaN(aYear) && !Number.isNaN(bYear) && aYear !== bYear) {
        return aYear - bYear;
      }

      const aOrder = termOrder[aSeason] ?? 99;
      const bOrder = termOrder[bSeason] ?? 99;

      return aOrder - bOrder;
    });

    return ['All', ...base];
  }, [items]);

  const filteredItems = useMemo(() => {
    let data = [...items];

    if (categoryFilter !== 'All') {
      data = data.filter((item) => item.category === categoryFilter);
    }
    if (buildingFilter !== 'All') {
      data = data.filter((item) => item.building === buildingFilter);
    }
    if (termFilter !== 'All') {
      data = data.filter((item) => item.term === termFilter);
    }

    data.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.date.localeCompare(a.date);
      }
      return a.date.localeCompare(b.date);
    });

    return data;
  }, [items, categoryFilter, buildingFilter, termFilter, sortOrder]);

  let content: JSX.Element;

  if (loading) {
    content = (
      <Row>
        <Col>
          <Card body className="text-center shadow-sm">
            <Spinner animation="border" size="sm" className="me-2" />
            <span>Loading items…</span>
          </Card>
        </Col>
      </Row>
    );
  } else if (error) {
    content = (
      <Row>
        <Col>
          <Card body className="text-center shadow-sm border-danger">
            <p className="mb-0 text-danger">{error}</p>
          </Card>
        </Col>
      </Row>
    );
  } else if (filteredItems.length === 0) {
    content = (
      <Row>
        <Col>
          <Card body className="text-center shadow-sm">
            <p className="mb-0">
              No items have been reported yet. Try changing the filters.
            </p>
          </Card>
        </Col>
      </Row>
    );
  } else {
    content = (
      <Row>
        {filteredItems.map((item) => {
          const status = statusBadge(item.status);
          const type = typeBadge(item.type);

          return (
            <Col key={item.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm rounded-3">
                {item.imageUrl ? (
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <Badge bg={type.bg}>{type.text}</Badge>
                    <Badge bg={status.bg}>{status.text}</Badge>
                  </div>

                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="small text-muted mb-2">
                    {item.building}
                    {' \u2022 '}
                    {item.term}
                  </Card.Text>
                  <Card.Text style={{ minHeight: '3em' }}>
                    {item.description}
                  </Card.Text>
                  {item.locationName ? (
                    <Card.Text className="small mb-0">
                      <strong>Pickup:</strong>
                      {' '}
                      {item.locationName}
                    </Card.Text>
                  ) : null}
                </Card.Body>
                <Card.Footer className="small text-muted">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <Card className="border-0 rounded-4 shadow-sm">
              <Card.Body className="py-4 px-4">
                <p className="text-uppercase text-muted small mb-1">
                  Welcome to Manoa Lost &amp; Found
                </p>
                <h1 className="display-5 fw-bold mb-2">
                  Find it. Report it. Reunite it.
                </h1>
                <p className="text-muted mb-3">
                  Browse every lost and found item reported across the UH Mānoa
                  campus.
                </p>
                <p className="fw-semibold mb-0">
                  You&apos;re viewing the campus-wide Lost/Found feed.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4 align-items-stretch">
          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Category</h6>
              <Form.Select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Building</h6>
              <Form.Select
                value={buildingFilter}
                onChange={(event) => setBuildingFilter(event.target.value)}
              >
                {BUILDING_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Term</h6>
              <Form.Select
                value={termFilter}
                onChange={(event) => setTermFilter(event.target.value)}
              >
                {termOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          <Col md={3}>
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Sort</h6>
              <Form.Select
                value={sortOrder}
                onChange={(event) => {
                  const value = event.target.value as 'newest' | 'oldest';
                  setSortOrder(value);
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </Form.Select>
            </Card>
          </Col>
        </Row>

        {content}
      </Container>
    </main>
  );
}

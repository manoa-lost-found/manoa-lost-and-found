"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Badge, Form, Spinner } from "react-bootstrap";

type ItemType = "LOST" | "FOUND";
type ItemStatus = "OPEN" | "TURNED_IN" | "WAITING_FOR_PICKUP" | "RECOVERED";

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

const CATEGORY_OPTIONS = ["All", "Bottle", "Electronics", "Clothing", "Misc"];
const BUILDING_OPTIONS = ["All", "POST 309", "Bilger", "Hamilton Library"];
const TERM_OPTIONS = ["All", "Fall 2025", "Spring 2026"];

function statusBadge(status: ItemStatus) {
  switch (status) {
    case "OPEN":
      return { text: "Open", bg: "warning" as const };
    case "TURNED_IN":
      return { text: "Turned In", bg: "info" as const };
    case "WAITING_FOR_PICKUP":
      return { text: "Waiting for Pickup", bg: "primary" as const };
    case "RECOVERED":
      return { text: "Recovered", bg: "success" as const };
    default:
      return { text: status, bg: "secondary" as const };
  }
}

function typeBadge(type: ItemType) {
  return type === "LOST"
    ? { text: "Lost", bg: "danger" as const }
    : { text: "Found", bg: "success" as const };
}

export default function LostFoundFeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [buildingFilter, setBuildingFilter] = useState<string>("All");
  const [termFilter, setTermFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // 🔹 Load items from the shared API route
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/items");
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        setItems(data.items ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredItems = useMemo(() => {
    let data = [...items];

    if (categoryFilter !== "All") {
      data = data.filter((i) => i.category === categoryFilter);
    }
    if (buildingFilter !== "All") {
      data = data.filter((i) => i.building === buildingFilter);
    }
    if (termFilter !== "All") {
      data = data.filter((i) => i.term === termFilter);
    }

    data.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.date.localeCompare(a.date);
      }
      return a.date.localeCompare(b.date);
    });

    return data;
  }, [items, categoryFilter, buildingFilter, termFilter, sortOrder]);

  return (
    <main
      style={{
        background: "linear-gradient(135deg, #f1f7f4, #e4f0ea)",
        minHeight: "calc(100vh - 64px)",
        padding: "3.5rem 0 4rem",
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

        {/* Filters */}
        <Row className="mb-4 align-items-stretch">
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

          <Col md={3} className="mb-3 mb-md-0">
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Term</h6>
              <Form.Select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
              >
                {TERM_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Card>
          </Col>

          <Col md={3}>
            <Card body className="h-100 shadow-sm rounded-3">
              <h6 className="mb-2 fw-semibold">Sort</h6>
              <Form.Select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </Form.Select>
            </Card>
          </Col>
        </Row>

        {/* Loading / Error / Feed */}
        {loading ? (
          <Row>
            <Col>
              <Card body className="text-center shadow-sm">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Loading items…</span>
              </Card>
            </Col>
          </Row>
        ) : error ? (
          <Row>
            <Col>
              <Card body className="text-center shadow-sm border-danger">
                <p className="mb-0 text-danger">{error}</p>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {filteredItems.length === 0 ? (
              <Col>
                <Card body className="text-center shadow-sm">
                  <p className="mb-0">
                    No items have been reported yet. Try changing the filters.
                  </p>
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
                        <div
                          style={{
                            width: "100%",
                            height: "180px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
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
                        <Card.Text style={{ minHeight: "3em" }}>
                          {item.description}
                        </Card.Text>
                        {item.locationName && (
                          <Card.Text className="small mb-0">
                            <strong>Pickup:</strong> {item.locationName}
                          </Card.Text>
                        )}
                      </Card.Body>
                      <Card.Footer className="small text-muted">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        )}
      </Container>
    </main>
  );
}

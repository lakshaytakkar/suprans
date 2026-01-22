-- Communication Automation System Tables
-- Migration: 002_create_communications_tables.sql
-- Description: Create tables for email/WhatsApp communication system

-- ============================================================================
-- Table: communication_templates
-- Stores email and WhatsApp message templates
-- ============================================================================
CREATE TABLE IF NOT EXISTS communication_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    template_type VARCHAR(50) NOT NULL CHECK (template_type IN ('transactional', 'marketing', 'automated')),

    -- Email-specific fields
    subject VARCHAR(500),

    -- Content (HTML for email, text/template for WhatsApp)
    content TEXT NOT NULL,

    -- WhatsApp-specific fields (for pre-approved templates)
    whatsapp_template_id VARCHAR(255),
    whatsapp_template_name VARCHAR(255),

    -- Template variables (JSON array of variable names)
    variables JSONB DEFAULT '[]'::jsonb,

    -- Metadata
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    tags TEXT[],

    -- Audit fields
    created_by UUID,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_templates_channel ON communication_templates(channel);
CREATE INDEX idx_templates_type ON communication_templates(template_type);
CREATE INDEX idx_templates_active ON communication_templates(is_active);
CREATE INDEX idx_templates_created_at ON communication_templates(created_at);

-- ============================================================================
-- Table: communication_logs
-- Stores history of all sent messages with delivery status
-- ============================================================================
CREATE TABLE IF NOT EXISTS communication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Message details
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    template_id UUID REFERENCES communication_templates(id) ON DELETE SET NULL,

    -- Recipient info
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(50),
    recipient_name VARCHAR(255),
    recipient_id UUID, -- Reference to lead/user if applicable
    recipient_type VARCHAR(50), -- 'lead', 'user', 'contact', etc.

    -- Message content (snapshot at time of sending)
    subject VARCHAR(500),
    content TEXT NOT NULL,
    content_html TEXT,

    -- Delivery tracking
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'queued', 'sent', 'delivered', 'opened', 'clicked',
        'bounced', 'failed', 'unsubscribed', 'spam', 'read'
    )),
    status_history JSONB DEFAULT '[]'::jsonb,

    -- External provider tracking
    external_id VARCHAR(255), -- Resend message ID or Twilio SID
    external_status VARCHAR(100),
    external_response JSONB,

    -- Error tracking
    error_message TEXT,
    error_code VARCHAR(100),
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,

    -- Engagement tracking
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    click_count INTEGER DEFAULT 0,

    -- Automation reference
    automation_rule_id UUID,
    automation_execution_id UUID,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Audit fields
    sent_by UUID,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_logs_channel ON communication_logs(channel);
CREATE INDEX idx_logs_status ON communication_logs(status);
CREATE INDEX idx_logs_template_id ON communication_logs(template_id);
CREATE INDEX idx_logs_recipient_id ON communication_logs(recipient_id);
CREATE INDEX idx_logs_recipient_email ON communication_logs(recipient_email);
CREATE INDEX idx_logs_recipient_phone ON communication_logs(recipient_phone);
CREATE INDEX idx_logs_sent_at ON communication_logs(sent_at);
CREATE INDEX idx_logs_created_at ON communication_logs(created_at);
CREATE INDEX idx_logs_automation_rule_id ON communication_logs(automation_rule_id);

-- ============================================================================
-- Table: communication_queue
-- Stores scheduled and pending messages
-- ============================================================================
CREATE TABLE IF NOT EXISTS communication_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Message details
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    template_id UUID REFERENCES communication_templates(id) ON DELETE CASCADE,

    -- Recipient info
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(50),
    recipient_name VARCHAR(255),
    recipient_id UUID,
    recipient_type VARCHAR(50),

    -- Message content
    subject VARCHAR(500),
    content TEXT NOT NULL,
    content_html TEXT,

    -- Variable values for template interpolation
    variables JSONB DEFAULT '{}'::jsonb,

    -- Scheduling
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    priority INTEGER DEFAULT 0, -- Higher = more urgent

    -- Status
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'processing', 'sent', 'failed', 'cancelled'
    )),

    -- Processing info
    processed_at TIMESTAMP WITH TIME ZONE,
    log_id UUID REFERENCES communication_logs(id) ON DELETE SET NULL,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,

    -- Automation reference
    automation_rule_id UUID,
    automation_execution_id UUID,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Audit fields
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_queue_status ON communication_queue(status);
CREATE INDEX idx_queue_scheduled_at ON communication_queue(scheduled_at);
CREATE INDEX idx_queue_channel ON communication_queue(channel);
CREATE INDEX idx_queue_priority ON communication_queue(priority DESC);

-- ============================================================================
-- Table: automation_rules
-- Stores trigger-based automation rules for communications
-- ============================================================================
CREATE TABLE IF NOT EXISTS automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,

    -- Trigger configuration
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN (
        'lead_created', 'lead_stage_changed', 'lead_assigned',
        'lead_updated', 'scheduled', 'manual', 'webhook'
    )),
    trigger_config JSONB DEFAULT '{}'::jsonb,

    -- Conditions (all must match to trigger)
    conditions JSONB DEFAULT '[]'::jsonb,
    -- Example: [{"field": "lead.stage", "operator": "equals", "value": "qualified"}]

    -- Actions to perform
    actions JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- Example: [{"type": "send_email", "template_id": "xxx", "delay_minutes": 0}]

    -- Timing
    delay_minutes INTEGER DEFAULT 0,

    -- Scheduling (for scheduled trigger type)
    schedule_cron VARCHAR(100),
    schedule_timezone VARCHAR(100) DEFAULT 'UTC',
    next_run_at TIMESTAMP WITH TIME ZONE,
    last_run_at TIMESTAMP WITH TIME ZONE,

    -- Status
    is_active BOOLEAN DEFAULT true,

    -- Stats
    total_executions INTEGER DEFAULT 0,
    successful_executions INTEGER DEFAULT 0,
    failed_executions INTEGER DEFAULT 0,

    -- Metadata
    tags TEXT[],

    -- Audit fields
    created_by UUID,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_rules_trigger_type ON automation_rules(trigger_type);
CREATE INDEX idx_rules_is_active ON automation_rules(is_active);
CREATE INDEX idx_rules_next_run_at ON automation_rules(next_run_at);

-- ============================================================================
-- Table: automation_executions
-- Stores execution history for automation rules
-- ============================================================================
CREATE TABLE IF NOT EXISTS automation_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID NOT NULL REFERENCES automation_rules(id) ON DELETE CASCADE,

    -- Trigger info
    trigger_type VARCHAR(50) NOT NULL,
    trigger_data JSONB DEFAULT '{}'::jsonb,

    -- Execution details
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'running', 'completed', 'failed', 'skipped'
    )),

    -- Results
    actions_executed INTEGER DEFAULT 0,
    actions_succeeded INTEGER DEFAULT 0,
    actions_failed INTEGER DEFAULT 0,
    results JSONB DEFAULT '[]'::jsonb,

    -- Error tracking
    error_message TEXT,
    error_stack TEXT,

    -- Timing
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER,

    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_executions_rule_id ON automation_executions(rule_id);
CREATE INDEX idx_executions_status ON automation_executions(status);
CREATE INDEX idx_executions_created_at ON automation_executions(created_at);

-- ============================================================================
-- Table: communication_settings
-- Stores channel configuration (API keys, sender info, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS communication_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel VARCHAR(20) NOT NULL UNIQUE CHECK (channel IN ('email', 'whatsapp')),

    -- Configuration (encrypted sensitive data)
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- Email example: {"from_email": "...", "from_name": "...", "reply_to": "..."}
    -- WhatsApp example: {"phone_number": "...", "business_name": "..."}

    -- Status
    is_configured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_tested_at TIMESTAMP WITH TIME ZONE,
    test_status VARCHAR(50), -- 'success', 'failed'
    test_error TEXT,

    -- Rate limiting
    rate_limit_per_minute INTEGER,
    rate_limit_per_hour INTEGER,
    rate_limit_per_day INTEGER,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Audit fields
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Functions and Triggers
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_communication_templates_updated_at
    BEFORE UPDATE ON communication_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_logs_updated_at
    BEFORE UPDATE ON communication_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_queue_updated_at
    BEFORE UPDATE ON communication_queue
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_rules_updated_at
    BEFORE UPDATE ON automation_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_settings_updated_at
    BEFORE UPDATE ON communication_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Initial data
-- ============================================================================

-- Insert default channel settings
INSERT INTO communication_settings (channel, config, is_configured, is_active) VALUES
    ('email', '{"from_name": "Suprans Team", "reply_to": ""}', false, false),
    ('whatsapp', '{"business_name": "Suprans"}', false, false)
ON CONFLICT (channel) DO NOTHING;

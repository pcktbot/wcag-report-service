{{- define "validate-configuration" }}
{{- if not .Values.configuration }}
{{ fail "a configuration is required!" }}
{{- end }}
{{- if not (hasKey .Values.configurations .Values.configuration) }}
{{ fail (printf "%s is not a defined configuration in %v" .Values.configuration (keys .Values.configurations)) }}
{{- end }}
{{- end }}
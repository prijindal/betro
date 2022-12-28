// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'NotificationResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NotificationResponse _$NotificationResponseFromJson(
        Map<String, dynamic> json) =>
    NotificationResponse(
      id: json['id'] as String,
      user_id: json['user_id'] as String,
      action: $enumDecode(_$NotificationActionsEnumMap, json['action']),
      content: json['content'] as String,
      read: json['read'] as bool,
      payload: json['payload'],
      created_at: DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$NotificationResponseToJson(
        NotificationResponse instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.user_id,
      'action': _$NotificationActionsEnumMap[instance.action]!,
      'content': instance.content,
      'read': instance.read,
      'payload': instance.payload,
      'created_at': instance.created_at.toIso8601String(),
    };

const _$NotificationActionsEnumMap = {
  NotificationActions.notification_on_approved: 'notification_on_approved',
  NotificationActions.notification_on_followed: 'notification_on_followed',
};

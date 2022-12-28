// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ApprovalResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApprovalResponse _$ApprovalResponseFromJson(Map<String, dynamic> json) =>
    ApprovalResponse(
      id: json['id'] as String,
      follower_id: json['follower_id'] as String,
      username: json['username'] as String,
      created_at: DateTime.parse(json['created_at'] as String),
      first_name: json['first_name'] as String?,
      last_name: json['last_name'] as String?,
      profile_picture: json['profile_picture'] as String?,
      public_key: json['public_key'] as String?,
      own_key_id: json['own_key_id'] as String?,
      own_private_key: json['own_private_key'] as String?,
      encrypted_profile_sym_key: json['encrypted_profile_sym_key'] as String?,
    );

Map<String, dynamic> _$ApprovalResponseToJson(ApprovalResponse instance) =>
    <String, dynamic>{
      'first_name': instance.first_name,
      'last_name': instance.last_name,
      'profile_picture': instance.profile_picture,
      'public_key': instance.public_key,
      'own_key_id': instance.own_key_id,
      'own_private_key': instance.own_private_key,
      'encrypted_profile_sym_key': instance.encrypted_profile_sym_key,
      'id': instance.id,
      'follower_id': instance.follower_id,
      'username': instance.username,
      'created_at': instance.created_at.toIso8601String(),
    };

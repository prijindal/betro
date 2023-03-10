import 'dart:convert';

import 'package:logging/logging.dart';

import 'package:betro/encryption//betro_dart_lib.dart';

import './auth.dart';
import './types/GroupResponse.dart';
import './types/CreateGroupRequest.dart';

final _logger = Logger('api/follow');

class GroupController {
  final AuthController auth;
  GroupController(this.auth);

  Future<List<GroupResponse>> fetchGroups() async {
    final response = await auth.client.get('/api/groups');
    return (response.data as List<dynamic>)
        .map((a) => GroupResponse.fromJson(a))
        .toList();
  }

  Future<bool> deleteGroup(String groupId) async {
    final response = await auth.client.delete('/api/groups/$groupId');
    return response.data['deleted'];
  }

  Future<GroupResponse?> createGroup(
    String name, [
    bool is_default = false,
  ]) async {
    final encryptionKey = auth.encryptionKey;
    if (encryptionKey == null) return null;
    final symKey = generateSymKey();
    final encryptedSymKey = await symEncrypt(
      encryptionKey,
      base64Decode(symKey),
    );
    final req = CreateGroupRequest(
      sym_key: encryptedSymKey,
      name: name,
      is_default: is_default,
    );
    final response = await auth.client.post(
      '/api/groups',
      data: jsonEncode(req),
    );
    _logger.finer(response.data);
    return GroupResponse.fromJson(response.data);
  }
}
